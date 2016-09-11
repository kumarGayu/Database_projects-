/** @jsx React.DOM */
var React = require('react');

var ImageInput = React.createClass({
  onContextMenu: function(event) {
      event.preventDefault();
      console.log('on image');
      if(this.props.onContextMenu) {
        this.props.onContextMenu(event);
      }
  },

  onClick: function(event) {
      event.preventDefault();
      console.log('on click');
      if(this.props.onUpload  ) {
        this.props.onUpload(event);
      }
  },

  render: function(){
    return (
      <div className="image-input">
        <input type="file" disabled ref="img" name="img" />
        <input type="text" ref="imageName" />
        <input type="submit" value="upload" onClick={this.onClick} />
      </div>
    );
  }

});

module.exports = ImageInput;
