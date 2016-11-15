var React = require('react');
var Image = require('./Image');
var ImageInput = require('./ImageInput');
var ImagePreview = require('./ImagePreview');
var Panel = require('./Panel');
var Button = require('./Button');
var Tags = require('./Tags');
var TagDialog = require('./TagDialog');
var tagStore = require('../stores/tagStore');
var tagActions = require('../actions/tagActions');
var imageStore = require('../stores/imageStore');
var imageActions = require('../actions/imageActions');
var _ = require('lodash');
var Link = require('react-router').Link

var Main = React.createClass({
  getInitialState: function() {
    return {
      isTagsHidden: true,
      isTagDialogHidden: true,
      positions:[],
      tags:[],
      left:0,
      top:0,
      title:"",
      images:[],
      image: {},
      imageIndex:0
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
      tes:12,
      tag: tag.tag,
      imageId: this.state.image._id, 
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
    this.state.images= _.chunk(imageStore.getList(),4)[this.state.imageIndex];
    this.state.image = _.chunk(imageStore.getList(),4)[this.state.imageIndex][0];
    this.forceUpdate();
    tagActions.getTag(this.state.image._id);
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

  onImageClick: function(event){
    this.setState({
      image: event.data
    });
    tagActions.getTag(event.data._id);
  },

  onNextClick: function(){
    if(this.state.imageIndex < _.chunk(imageStore.getList(),4).length-1){
      this.state.images = _.chunk(imageStore.getList(),4)[++this.state.imageIndex];
      this.forceUpdate();
    }
  },

  onPrevClick: function(){
    if(this.state.imageIndex > 0){
      this.state.images = _.chunk(imageStore.getList(),4)[--this.state.imageIndex];
      this.forceUpdate();
    }
  },

  componentWillUnmount: function(){
    tagStore.removeChangeListener(this.onChange);
    imageStore.removeChangeListener(this.onImageChange);
  },
    render: function(){
      return (
        <Panel className="parent">
          <Panel className="center">
            <Button lable = 'Show tags' onClick = {this.onShowTags}/>
            <Button lable = 'Hide tags' onClick = {this.onHideTags}/>
          </Panel>
          <Panel className="drag-area center">
              <TagDialog hidden = {this.state.isTagDialogHidden}
                          addTag = {this.addATag} left={this.state.left} top={this.state.top} />
              <Image src={this.state.image} ref="images" onClick={this.onClick} onContextMenu = {this.showTagDialog}/>
              {this.getTags()}
          </Panel>
          <Panel className="center">
            <ImageInput ref="imageFile" onUpload={this.onUpload} />
          </Panel>
          <Panel className="center">
            <ImagePreview images={this.state.images} onImageClick={this.onImageClick} onNextClick={this.onNextClick} onPrevClick={this.onPrevClick} />
          </Panel>
        </Panel>
      );
    }
});

module.exports = Main;