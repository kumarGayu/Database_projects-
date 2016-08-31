var React = require('react');

var Button = React.createClass({

    propTypes: {
        lable: React.PropTypes.string
    },

    onClick: function(event) {
        event.preventDefault();

        if(this.props.onClick){
            this.props.onClick();
        }
    },

    render: function() {
        return (
            <input type='button'
            className = 'button'
            value = {this.props.lable}
            onClick = {this.onClick}/>
        );
    }
});

module.exports = Button;
