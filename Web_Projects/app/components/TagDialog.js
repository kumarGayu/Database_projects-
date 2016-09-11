/** @jsx React.DOM */
var React = require('react');
var Button = require('./Button');
var _ = require("lodash");
var Panel = require('./Panel');

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
        var e={
            type: event.target.innerText.split(" ")[0],
            tag: this.state.text
        };

        if(this.props.addTag){
            this.props.addTag(e);
        }
    },

    textChange: function(event){
        event.preventDefault();
        this.setState({text: event.target.value});
    },

    getDialogStyle: function(){
        if(this.props.hidden){
            return {
                display: 'none',
                left: this.props.left-150,
                top: this.props.top-100
            };
        } else {
            return {
                display: 'block',
                left: this.props.left-150,
                top: this.props.top-100
            };
        }
    },

    render: function() {
        return (
            <div id='form_panel' style={this.getDialogStyle()}>
                <Panel className='row'>
                    <label>Title</label>
                    <div className='field'>
                        <input type='text' id='title' onChange={this.textChange} value={this.state.text} />
                    </div>
                </Panel>
                <Panel className='row'>
                    <Panel className='field center'>
                        <Button lable = 'small tag' onClick={this.addTag}/>
                        <Button lable = 'regular tag' onClick={this.addTag}/>
                        <Button lable = 'big tag' onClick={this.addTag}/>
                    </Panel>
                </Panel>
            </div>
        );
    }
});

module.exports = TagDialog;
