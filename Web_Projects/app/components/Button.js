var React = require('react');
var B = require('react-bootstrap').Button;
var Button = React.createClass({

    propTypes: {
        lable: React.PropTypes.string
    },

    onClick: function(event) {
        event.preventDefault();

        if(this.props.onClick){
            this.props.onClick(event);
        }
    },

    render: function() {
        return (
            <B className = {'button '+this.props.className} onClick = {this.onClick}> {this.props.lable}</B>
        );
    }
});

module.exports = Button;
