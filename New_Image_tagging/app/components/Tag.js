/** @jsx React.DOM */
var React = require('react');
var Button = require('./Button');
var Close = require('./Close');
var _ = require('lodash');
var ReactDOM = require('react-dom');
var DraggableMixin = require('./DraggableMixin.js');
var OnClickOutsideMixin = require('./OnClickOutsideMixin.js');
var Tag = React.createClass({
    mixins: [DraggableMixin, OnClickOutsideMixin],

    propTypes: {
        key: React.PropTypes.string
    },

    dragged:false,

    getDefaultProps: function() {
        return {
           key: "",
           positions: {},
           tag: {}
        };
    },

    getInitialState: function() {
        return {
            showClose: false
        };
    },

    getClose: function(){
        if(this.state.showClose){
            return (<Close position={this.props.position} onClose={this.onClose} />);
        }
    },

    onClick:function(){
        if(!this.dragged){
            this.setState({
                showClose: !this.state.showClose
            })
        }
        this.dragged = false;
    },

    onChange: function(event){
        var me = this;
        this.dragged = true;
        var newPosition = {
            x: event.pageX - this.props.imageX,
            y: event.pageY - this.props.imageY
        }
        _.remove(this.props.tag.positions,function(position){
            if(position === me.props.position){
                return position;
            }
        });
        this.props.tag.positions.push(newPosition);
        this.props.ondblclick(this.props.tag);
    },

    onClose: function(){
        this.setState({
            showClose: false
        })
        var me = this;
        _.remove(this.props.tag.positions,function(position){
            if(position === me.props.position){
                return position;
            }
        });
        this.props.ondblclick(this.props.tag);
    },
    
    componentDidMount: function (){
        var dragHandle = ReactDOM.findDOMNode(this.refs.draggable).getElementsByClassName("drag-area")[0];
        this.draggable( ReactDOM.findDOMNode(this.refs.draggable), dragHandle, "absolute");
    },

    render: function() {

        return (
            <div className="tagged dragMe" key={this.props.key} style={{left:this.props.imageX+this.props.position.x,top:this.props.imageY+this.props.position.y,display:"block"}} ref="draggable">
                <div id={this.props.tag.tag} className="circle tag" onClick={this.onClick}/>
                {this.getClose()}
            </div>
        );
    }
});

module.exports = Tag;
