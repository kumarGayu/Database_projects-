var React = require('react');
var llamaconfig = require('./llamaconfig');
var Link = require('react-router').Link;

var llamaprofile = React.createClass({

  displayName: "llamaprofile",

  render: function() {
  	  var details  = llamaconfig.descriptions.map(function(value,key){
            	return(<div key={key}><h4 className="text-uppercase">{value.name}</h4><p>{value.desc}</p><img className={"image"+key} src={"./Web_Projects/image/Llama"+key+".jpg"} /></div>)
            })
      return (
          <div className="container">
            <div className="span12">
            	<em>The whole web page is designed on React Framework (NodeJs) and Bootstrap</em>
            	<br />
            	<em>Projects are built on RESTFul APIs with Express</em>
            	<p>I have built several stand alone java applications which are found on github <em>to know more about me click on <Link to={'about'}>About me</Link></em></p>
            	<h3>Reasons to Select React Framework as Development Tool <Link to={'reasons'}>Reasons</Link></h3>
            	<h2 className="text-uppercase">{llamaconfig.name}</h2>
            	{details}
            </div>
          </div>
      )
  }

});

module.exports = llamaprofile