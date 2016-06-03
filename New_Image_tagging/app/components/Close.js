/** @jsx React.DOM */
var React = require('react');

var Close = React.createClass({
    propTypes: {
        position: React.PropTypes.object
    },
    onClose: function(event) {
        event.preventDefault();

        if(this.props.onClose){
            this.props.onClose();
        }
    },

    render: function() {
        return (
            <div className = 'close' value = {this.props.lable} onClick = {this.onClose} />
        );
    }
});

module.exports = Close;
