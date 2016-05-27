var React = require('react');

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
            <button className = {'button '+this.props.className} style={{display: 'flex', justifyContent: 'center'}} onClick = {this.onClick}>
                <span className='text-center' >{this.props.lable}</span>
            </button>
        );
    }
});

module.exports = Button;
