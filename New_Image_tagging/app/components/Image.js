/** @jsx React.DOM */
var React = require('react');

var Image = React.createClass({
  onContextMenu: function(event) {
      event.preventDefault();
      if(this.props.onContextMenu) {
        this.props.onContextMenu(event);
      }
  },

  onClick: function(event) {
      event.preventDefault();
      if(this.props.onClick) {
        event.data = this.props.src;
        this.props.onClick(event);
      }
  },

  render: function(){
    return (
      <img src={this.props.src.data} key={this.props.imageKey} id="imageMap" ref="image" onContextMenu={this.onContextMenu} onClick={this.onClick} />
    );
  }

});

module.exports = Image;
