var React = require('react');
var ReactDOM = require('react-dom');
var Image = require('./components/Image');
var Panel = require('./components/Panel');
var Button = require('./components/Button');
var Tags = require('./components/Tags');
var TagDialog = require('./components/TagDialog');
var tagStore = require('./stores/tagStore');
var tagActions = require('./actions/tagActions');

var App = React.createClass({
  getInitialState: function() {
    return {
      isTagsHidden: true,
      isTagDialogHidden: true,
      positions:[],
      tags:[],
      left:0,
      top:0,
      title:""
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

  onTagDelete: function(tag){
    tagActions.removeTag(tag);
  },

  onRemoveTags: function(){
    tagActions.removeAll();
  },

  componentDidMount: function (){
    tagStore.addChangeListener(this.onChange);
    tagActions.getTag();
  },

  componentWillUnmount: function(){
    tagStore.removeChangeListener(this.onChange);
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
        </Panel>
      );
    }
});

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
