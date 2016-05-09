package bufmgr;

import java.util.Collection;
import java.util.HashMap;

import global.GlobalConst;
import global.Minibase;
import global.Page;
import global.PageId;

/**
 * <h3>Minibase Buffer Manager</h3>
 * The buffer manager reads disk pages into a main memory page as needed. The
 * collection of main memory pages (called frames) used by the buffer manager
 * for this purpose is called the buffer pool. This is just an array of Page
 * objects. The buffer manager is used by access methods, heap files, and
 * relational operators to read, write, allocate, and de-allocate pages.
 */
public class BufMgr implements GlobalConst {

	/** Actual pool of pages (can be viewed as an array of byte arrays). */
	protected Page[] bufpool;

	/** Array of descriptors, each containing the pin count, dirty status, etc\
	. */
	protected FrameDesc[] frametab;

	/** Maps current page numbers to frames; used for efficient lookups. */
	protected HashMap<Integer, FrameDesc> pagemap;
	/** The replacement policy to use. */
	protected Replacer replacer;
	//-------------------------------------------------------------


	/**
	 * Constructs a buffer mamanger with the given settings.
	 * 
	 * @param numbufs number of buffers in the buffer pool
	 */
	public BufMgr(int numbufs) {
		bufpool = new Page[numbufs];
		frametab = new FrameDesc[numbufs];
		for(int i=0; i<numbufs; i++ ){
			bufpool[i]= new Page();
			frametab[i]= new FrameDesc(i);
		}
		replacer = new Clock(this);
		pagemap = new HashMap<Integer, FrameDesc>(numbufs);
	}

	/**
	 * Allocates a set of new pages, and pins the first one in an appropriate
	 * frame in the buffer pool.
	 * 
	 * @param firstpg holds the contents of the first page
	 * @param run_size number of pages to allocate
	 * @return page id of the first new page
	 * @throws IllegalArgumentException if PIN_MEMCPY and the page is pinned
	 * @throws IllegalStateException if all pages are pinned (i.e. pool exceeded)
	 */

	public PageId newPage(Page firstpg, int run_size) throws Exception{
		PageId pageId = Minibase.DiskManager.allocate_page(run_size);
		try{
			pinPage(pageId, firstpg, PIN_MEMCPY);
		}catch(Exception exception){
			//deallocate the pages if pinPage is failed.
			for(int index =0; index<run_size;index++){
				Minibase.DiskManager.deallocate_page(pageId);
				pageId.pid+=1;
			}
			throw exception;
		}
		return pageId;
	}

	/**
	 * Deallocates a single page from disk, freeing it from the pool if needed.
	 * 
	 * @param pageno identifies the page to remove
	 * @throws IllegalArgumentException if the page is pinned
	 */
	public void freePage(PageId pageno) {
		FrameDesc currentPage = pagemap.get(pageno.pid);
		if(currentPage != null){
			//if a page is not pinned then remove the page from bufpool
			if(currentPage.pincnt ==0){
				int index = currentPage.index;
				bufpool[index]=new Page();
				frametab[index] = new FrameDesc(index);
				replacer.freePage(pagemap.get(pageno.pid));
				pagemap.remove(pageno.pid);
				Minibase.DiskManager.deallocate_page(pageno);
			}else{
				throw new IllegalArgumentException("Pinned page cannot be deallocated");
			}
		}else{
			Minibase.DiskManager.deallocate_page(pageno);
		}
	}


	/**
	 * Pins a disk page into the buffer pool. If the page is already pinned, this
	 * simply increments the pin count. Otherwise, this selects another page in
	 * the pool to replace, flushing it to disk if dirty.
	 * 
	 * @param pageno identifies the page to pin
	 * @param page holds contents of the page, either an input or output param
	 * @param skipRead PIN_MEMCPY (replace in pool); PIN_DISKIO (read the page in)
	 * @throws IllegalArgumentException if PIN_MEMCPY and the page is pinned
	 * @throws IllegalStateException if all pages are pinned (i.e. pool exceeded)
	 */
	public void pinPage(PageId pageno, Page page, boolean skipRead) {
		FrameDesc frame = pagemap.get(pageno.pid);
		if(frame != null){
			if(skipRead == PIN_MEMCPY && frame.pincnt >0){ 
				//page is already pinned and skipRead is PIN_MEMCPY
				throw new IllegalArgumentException("Page cannot be coppied as it is already in use");
			}else{
				//page is present,so increment the pin and notify replacer 
				page.setPage(bufpool[frame.index]);
				frame.pincnt++;
				replacer.pinPage(frame);
			}
		}else {
			// pickVictim gives index of next free slot in bufpool[], if empty, else it follows clock policy to get the index.
			int victimIndex = replacer.pickVictim();
			if(victimIndex == -1){
				throw new IllegalStateException("No space in Buffer pool");
			}else{
				frame = frametab[victimIndex]; 
				if(frame.dirty){
					flushPage(frame.pageno);
				}
				if(skipRead == PIN_DISKIO){
					Minibase.DiskManager.read_page(pageno, bufpool[victimIndex]);
				}else{
					bufpool[victimIndex].copyPage(page);
				}
				page.setPage(bufpool[victimIndex]);
				pagemap.remove(frame.pageno.pid);
				frametab[victimIndex].pageno.pid = pageno.pid;
				frametab[victimIndex].pincnt++;
				frametab[victimIndex].dirty = false;
				pagemap.put(pageno.pid, frametab[victimIndex]);
				replacer.pinPage(frame);
			}
		}
	}

	/**
	 * Unpins a disk page from the buffer pool, decreasing its pin count.
	 * 
	 * @param pageno identifies the page to unpin
	 * @param dirty UNPIN_DIRTY if the page was modified, UNPIN_CLEAN otherrwise
	 * @throws IllegalArgumentException if the page is not present or not pinned
	 */
	public void unpinPage(PageId pageno, boolean dirty) {
		FrameDesc frame = pagemap.get(pageno.pid);
		if(frame == null || frame.pincnt == 0 ){
			throw new IllegalArgumentException("Page is not present or it is not pinned.");
		}
		frame.pincnt--;
		frame.dirty = dirty;
		frametab[frame.index] = frame;
		pagemap.put(frame.pageno.pid, frame);
		if(frame.pincnt == 0){
			replacer.unpinPage(frame);
		}
	}

	/**
	 * Immediately writes a page in the buffer pool to disk, if dirty.
	 */
	public void flushPage(PageId pageno) {
		try{
			FrameDesc flushingFrame = pagemap.get(pageno.pid);
			if(flushingFrame.dirty && flushingFrame.pincnt == 0){
				Minibase.DiskManager.write_page(pageno, bufpool[flushingFrame.index]);
			}
		}catch(Exception e){
			System.out.println(e.getStackTrace());
		}
	}

	/**
	 * Immediately writes all dirty pages in the buffer pool to disk.
	 */
	public void flushAllPages() {
		Collection<FrameDesc> frames = pagemap.values();
		for(FrameDesc frame: frames){
			flushPage(frame.pageno);
		}
	}

	/**
	 * Gets the total number of buffer frames.
	 */
	public int getNumBuffers() {
		return pagemap.values().size();
	}

	/**
	 * Gets the total number of unpinned buffer frames.
	 */
	public int getNumUnpinned() {
		int count = 0;
		int last = frametab.length;
		for (int index=0; index<last;index++){
			if(frametab[index].pincnt == 0){
				count++;
			}
		}
		return count;
	}

} // public class BufMgr implements GlobalConst
