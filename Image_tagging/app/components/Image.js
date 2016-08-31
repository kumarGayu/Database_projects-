var React = require('react');
var React = require('react');

var Image = React.createClass({
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
      if(this.props.onContextMenu) {
        this.props.onClick(event);
      }
  },

  render: function(){
    return (
      <img src={this.props.path} id="imageMap" ref="image" onContextMenu={this.onContextMenu} onClick={this.onClick}/>
    );
  }

});

module.exports = Image;
