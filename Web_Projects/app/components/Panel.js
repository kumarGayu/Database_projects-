/** @jsx React.DOM */
var React = require('react');
var _ = require("lodash");

var Panel = React.createClass({

    render: function() {
    	var style;
    	if(this.props.className && this.props.className.includes('center')){
    		style = {
    			display: 'flex',
    			justifyContent: 'center'
    		};
    	}
        return (
            <div style={style} className={this.props.className}>
                {this.props.children}
            </div>
          );
    }
});

module.exports = Panel;

