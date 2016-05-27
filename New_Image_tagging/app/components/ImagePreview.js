/** @jsx React.DOM */
var React = require('react');
var Button = require('./Button');

var ImagePreview = React.createClass({
  propTypes: {
        images: React.PropTypes.array
    },

  render: function(){
    var images = [];
    if(this.props.images){
      this.props.images.forEach(function(image, index, array ){
        images.push(<div className="preview-image" key={index}><img src={image.data} key={image.name+index} onClick={this.onClick} /> </div>);
      });
    }

    return (
      <div className="border-preview-image">
        <Button type="image" className="left" value="next" />
           <div className="preview-images">
              {images}
           </div>
        <Button type="image" className="right" value="prev" />
      </div>
    );
  }

});

module.exports = ImagePreview;
