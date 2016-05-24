var React = require('react');
var ReactDOM = require('react-dom');
var Image = require('./components/Image');
var ImageInput = require('./components/ImageInput');
var ImagePreview = require('./components/ImagePreview');
var Panel = require('./components/Panel');
var Button = require('./components/Button');
var Tags = require('./components/Tags');
var TagDialog = require('./components/TagDialog');
var tagStore = require('./stores/tagStore');
var tagActions = require('./actions/tagActions');
var imageStore = require('./stores/imageStore');
var imageActions = require('./actions/imageActions');

var App = React.createClass({
  getInitialState: function() {
    return {
      isTagsHidden: true,
      isTagDialogHidden: true,
      positions:[],
      tags:[],
      left:0,
      top:0,
      title:"",
      image:[]
    };
  },

  onShowTags: function() {
    this.setState({
      isTagDialogHidden: true,
      isTagsHidden: false
    });
  },

  onHideTags: function() {
    this.setState({
      isTagDialogHidden: true,
      isTagsHidden: true
    });
  },

  addATag: function(tag) {
    this.setState({
      isTagDialogHidden: true,
      isTagsHidden: false
    });
    tagActions.addTag({
      type: tag.type,
      tag: tag.tag,
      positions: this.state.positions
    });
  },

  onClick: function(event){
    var imageX = this.refs.images.refs.image.x;
    var imageY = this.refs.images.refs.image.y;
    this.state.positions.push({
      x: event.pageX-imageX,
      y: event.pageY-imageY
    });

  },

  showTagDialog: function(event) {
    this.setState({
      isTagDialogHidden: false,
      isTagsHidden: true,
      left: event.pageX,
      top: event.pageY
    });
  },

  getTags: function(){
    if(this.state.isTagsHidden === false){
      return <Tags tags={this.state.tags} imageX={this.state.imageX} imageY={this.state.imageY} onClick={this.onTagClick} onTagDelete={this.onTagDelete}> </Tags>;
    }
  },

  onChange: function(){
    this.state.positions = [];
    this.setState({
      imageX:this.refs.images.refs.image.x,
      imageY:this.refs.images.refs.image.y,
      tags: tagStore.getList(),
      isTagsHidden: false
    });
  },

  onImageChange: function(){
    this.state.images= imageStore.getList();
    this.forceUpdate();
  },

  onTagDelete: function(tag){
    tagActions.removeTag(tag);
  },

  onRemoveTags: function(){
    tagActions.removeAll();
  },

  componentDidMount: function (){
    tagStore.addChangeListener(this.onChange);
    imageStore.addChangeListener(this.onImageChange);
    tagActions.getTag();
    imageActions.getImages();
  },

  onUpload: function(event) {
    var file = this.refs.imageFile.refs.img.files;
    var fileName = this.refs.imageFile.refs.imageName.value;
    var imageBin = file[0];
    var reader  = new FileReader();

    reader.addEventListener("load", function () {
      imageActions.addImage({
        "data":reader.result.slice("base64"),
        "filename": fileName
      });
    }, false);

    if (imageBin) {
      reader.readAsDataURL(imageBin);
    }
  },

  componentWillUnmount: function(){
    tagStore.removeChangeListener(this.onChange);
    imageStore.removeChangeListener(this.onImageChange);
  },

    render: function(){
      return (
        <Panel>
          <Panel className="center">
            <Button lable = 'Show tags' onClick = {this.onShowTags}/>
            <Button lable = 'Hide tags' onClick = {this.onHideTags}/>
            <Button lable = 'Remove all' onClick = {this.onRemoveTags}/>
          </Panel>
          <Panel className="drag-area center">
              <TagDialog hidden = {this.state.isTagDialogHidden}
                          addTag = {this.addATag} left={this.state.left} top={this.state.top} />
              <Image path={'image/test_image.png'} ref="images" onClick={this.onClick} onContextMenu = {this.showTagDialog}/>
              {this.getTags()}
          </Panel>
          <Panel className="center">
            <ImageInput ref="imageFile" onUpload={this.onUpload} />
          </Panel>
          <Panel className="center">
            <ImagePreview images={this.state.images} />
          </Panel>
        </Panel>
      );
    }
});

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
