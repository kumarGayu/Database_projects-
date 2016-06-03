/** @jsx React.DOM */
var React = require('react');
var Button = require('./Button');
var Image = require('./Image');

var ImagePreview = React.createClass({
  propTypes: {
        images: React.PropTypes.array
    },

   onNextClick: function(event){
   	 this.props.onNextClick();
   },

   onPrevClick: function(event){
   	 this.props.onPrevClick();
   },

   onClick: function(event){
   	 this.props.onImageClick(event);
   },

  render: function(){
    var images = [];
    if(this.props.images){
    var me = this;
      this.props.images.forEach(function(image, index, array ){
        images.push(<div className="preview-image" key={index}><Image imageKey={image.name+index} src={image} onClick={me.onClick}/> </div>);
      });
    }

    return (
      <div className="border-preview-image">
        <Button type="image" className="left" value="next" onClick = {this.onPrevClick}/>
           <div className="preview-images">
              {images}
           </div>
        <Button type="image" className="right" value="prev" onClick= {this.onNextClick}/>
      </div>
    );
  }

});

module.exports = ImagePreview;
