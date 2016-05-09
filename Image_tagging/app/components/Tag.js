var React = require('react');
var Button = require('./Button');
var Close = require('./Close');
var _ = require('lodash');

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
            x: event.clientX,
            y: event.clientY
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
        var dragHandle = this.refs.draggable.getDOMNode().getElementsByClassName("drag-area")[0];
        this.draggable(this.refs.draggable.getDOMNode(), dragHandle, "absolute");
    },

    render: function() {
        return (
            <div className="tagged dragMe" key={this.props.key} style={{left:this.props.position.x,top:this.props.position.y,display:"block"}} ref="draggable">
                <div id={this.props.tag.tag} className="circle tag" onClick={this.onClick}/>
                {this.getClose()}
            </div>
        );
    }
});

module.exports = Tag;
