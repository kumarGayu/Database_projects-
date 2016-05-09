"use strict";

/**
 * Provides drag and drop funtionality.
 *
 * 1) Take DraggableMixin into use in React component
 *    that you want to be draggable:
 * <p><code>
 *    mixins: [DraggableMixin],
 * </code></p>
 *
 * 2) Assign a ref attribute to draggable element returned from
 *    the render function:
 * <p><code>
 *    div className="dragMe" ref="draggable"
 * </code></p>
 *
 * 3) In the componentDidMount and/or componentDidUpdate function of the draggable React
 *    component invoke draggable function:
 *
 *    3.A) If you just want the element to have 'fixed' position:
 * <p><code>
 *     this.draggable(this.refs.draggable.getDOMNode());
 * </code></p>
 *
 *    3.B) If you want the element to have 'relative' position:
 * <p><code>
 *     this.draggable(this.refs.draggable.getDOMNode(), undefined, "relative");
 * </code></p>

 *    3.C) If you want the element to have 'absolute' position:
 * <p><code>
 *     this.draggable(this.refs.draggable.getDOMNode(), undefined, "absolute");
 * </code></p>
 *    
 *    3.D) If you want the element to have only some part from which it can be dragged:
 * <p><code>
 *     var dragHandle = this.refs.draggable.getDOMNode().getElementsByClassName("drag-area")[0];
 *     this.draggable(this.refs.draggable.getDOMNode(), dragHandle, "relative");
 * </code></p>
 *
 * * @class
 * @type {object}
 * @memberof nWidgets.mixins
 *
 * @return {object}
 */
var DraggableMixin = {

    draggableElement: null,
    isDrag: false,

    /**
     * Makes given element draggable
     *
     * Can be given only "element"-parameter, 
     * in which case the draggable element's position is set to "fixed" and the entire element is draggable
     * 
     * Can also be given string to set the draggable element's style attribute for "position", 
     * as well as one or more specific DOM elements to be assigned as the element's drag handles
     *
     * @param {object}  element                 HTML element
     * @param {object}  [dragHandle=undefined]  part of the element from which it can be dragged, if the entire element should not register dragging events
     * @param {String}  [position="fixed"]      "relative" for relative position or "absolute" for absolute position, otherwise position is fixed
     */
    draggable: function(element, dragHandle, position) {

        if (this.draggableElement) {
            element.removeEventListener("mousedown", this.startDragging);
        }
        this.draggableElement = element;

        if (position === "relative") {
            element.style.position = "relative";
        }
        else if (position === "absolute") {
            element.style.position = "absolute";
        }
        else {
            element.style.position = "fixed";
        }

        if (dragHandle) {
            dragHandle.addEventListener("mousedown", this.startDragging);
        }
        else {
            element.addEventListener("mousedown", this.startDragging);
        }
    },

    startDragging: function(event) {
        if (event.button !== 0) {
            return;
        }

        var element = this.draggableElement;

        this.lockElementSize();

        this.addDocumentListeners();
    },

    addDocumentListeners: function () {
        document.addEventListener("mousemove", this.drag);
        document.addEventListener("mouseup", this.stopDragging);
    },

    getInitialPosition: function(element) {
        var top = 0;
        var left = 0;

        if (element.style.left) {
            left = element.style.left;
        }
        else {
            left = element.offsetLeft;
        }

        if (element.style.top) {
            top = element.style.top;
        }
        else {
            top = element.offsetTop;
        }
        
        return {
            top: top,
            left: left
        };
    },

    lockElementSize: function() {
        var element = this.draggableElement;
        var style = window.getComputedStyle(element);
        if (!style.minWidth) {
            element.style.minWidth = element.clientWidth + "px";
        }
        if (!style.minHeight) {
            element.style.minHeight = element.clientHeight + "px";
        }
    },

    unlockElementSize: function() {
        this.draggableElement.style.minWidth = "";
        this.draggableElement.style.minHeight = "";
    },

    drag: function(event) {
        this.isDrag = true;
        var style = this.draggableElement.style;

        var elementXPosition = parseInt(style.left, 10);
        if (event.clientX >= 0 &&
            event.clientX <= window.innerWidth) {
            
            var elementNewXPosition = elementXPosition + (event.clientX - this.draggableElement.lastXPosition);
        }

        var elementYPosition = parseInt(style.top, 10);
        if (event.clientY >= 0 &&
            event.clientY <= window.innerHeight) {
            
            var elementNewYPosition = elementYPosition + (event.clientY - this.draggableElement.lastYPosition);
        }

        style.left = elementNewXPosition + "px";
        style.top = elementNewYPosition + "px";

        this.draggableElement.lastXPosition = event.clientX;
        this.draggableElement.lastYPosition = event.clientY;
    },

    stopDragging: function(event) {
        if (event.button !== 0) {
            return;
        }
        if(this.isDrag){
            this.onChange(event);
            this.isDrag= false;
        }
        document.removeEventListener("mousemove", this.drag);
        document.removeEventListener("mouseup", this.removeDocumentListeners);
        this.unlockElementSize();
    }
};

module.exports = DraggableMixin;
