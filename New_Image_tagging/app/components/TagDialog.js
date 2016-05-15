/** @jsx React.DOM */
var React = require('react');
var Button = require('./Button');

var TagDialog = React.createClass({

    propTypes: {
        hidden: React.PropTypes.bool
    },

    getDefaultProps: function() {
        return {
            hidden: true
        };
    },

    getInitialState: function(){
        return {
            text: ''
        };
    },
    addTag: function(event){
        if(this.props.addTag){
            console.log(this.state.text);
            this.props.addTag(this.state.text);
        }
    },

    textChange: function(event){
        event.preventDefault();
        this.setState({text: event.target.value});
    },

    getDialogStyle: function(){
        if(this.props.hidden){
            return {display: 'none'};
        } else {
            return {display: 'block'};
        }
    },

    render: function() {
        return (
            <div id='form_panel' style={this.getDialogStyle()}>
                <div className='row'>
                    <div className='label'>Title</div>
                    <div className='field'>
                        <input type='text' id='title' onChange={this.textChange} value={this.state.text} />
                    </div>
                </div>
                <div className='row'>
                    <div className='label'></div>
                    <div className='field'>
                        <Button lable = 'Add Tag' onClick={this.addTag}/>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = TagDialog;
