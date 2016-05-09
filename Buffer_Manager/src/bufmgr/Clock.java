package bufmgr;

/**
 * The "Clock" replacement policy.
 */
class Clock extends Replacer {

  //
  // Frame State Constants
  //
  protected static final int AVAILABLE = 10;
  protected static final int REFERENCED = 11;
  protected static final int PINNED = 12;

  /** Clock head; required for the default clock algorithm. */
  protected int head;

  // --------------------------------------------------------------------------

  /**
   * Constructs a clock replacer.
   */
  public Clock(BufMgr bufmgr) {
    super(bufmgr);
    // initialize the frame states
    for (int i = 0; i < frametab.length; i++) {
      frametab[i].state = AVAILABLE;
    }

    // initialize the clock head to 0 since it is the starting point of a clock 
    head = 0;

  } // public Clock(BufMgr bufmgr)

  /**
   * Notifies the replacer of a new page.
   */
  public void newPage(FrameDesc fdesc) {
    // no need to update frame state
  }

  /**
   * Notifies the replacer of a free page.
   */
  public void freePage(FrameDesc fdesc) {
    frametab[fdesc.index].state = AVAILABLE;
  }

  /**
   * Notifies the replacer of a pined page.
   */
  public void pinPage(FrameDesc fdesc) {
	frametab[fdesc.index].state = PINNED;
	}

  /**
   * Notifies the replacer of an unpinned page.
   */
  public void unpinPage(FrameDesc fdesc) {
	  frametab[fdesc.index].state = REFERENCED;
  }

  /**
   * Selects the best frame to use for pinning a new page.
   * 
   * @return victim frame number, or -1 if none available
   */
  public int pickVictim() {
	  int current = head;
	  int totalFrames = frametab.length;
	  int cnt = 0; 
	  while(frametab[head].state != AVAILABLE){
		  if(frametab[head].state == REFERENCED){
			  frametab[head].state = AVAILABLE;
		  }else{
			  cnt++;
		  }
		  
		  head = (head+1) % totalFrames;
		  // check whether bufpool is fool with all pinned.
		  if(current == head && cnt == totalFrames){
			  return -1;
		  }
	  }
	  head++;
	  if(head == totalFrames){ // if head is pointing to last, point to start  of array again. 
		  head = 0;
		  return totalFrames -1;
	  }
	  return head - 1;
  } // public int pick_victim()

} // class Clock extends Replacer
