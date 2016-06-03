
"use strict";

var _ = require("lodash");
var log = require("./log.js");
var ReactDOM = require('react-dom');
/**
 * Provides onClick outside callback. When document is clicked on
 * other than a componen having this mixin, a callback is executed.
 *
 * 1) Take OnClickOutsideMixin into use in react component:
 * <p><code>
 *    mixins: [OnClickOutsideMixin],
 * </code></p>
 *
 * 2) Define function handleClickOutside for the component:
 * <p><code>
 *    handleClickOutside: function() {
 *        this.closeMe();
 *    },
 * </code></p>
 *
 * @class
 * @type {object}
 * @memberof nWidgets.mixins
 *
 * @return {object}
 */
var OnClickOutsideMixin = {

    componentDidMount: function() {
        document.addEventListener("mousedown", this.handleDocumentEvent, true);
        document.addEventListener("touchstart", this.handleDocumentEvent, true);
    },

    componentWillUnmount: function() {
        document.removeEventListener("mousedown", this.handleDocumentEvent, true);
        document.removeEventListener("touchstart", this.handleDocumentEvent, true);
    },

    handleDocumentEvent: function(event) {
        var rootNode = ReactDOM.findDOMNode(this);
        var target = event.target;

        while(target.parentNode) {
            if(target === rootNode) {
                return;
            }

            target = target.parentNode;
        }

        if(this.handleClickOutside) {
            this.handleClickOutside();
        } else {
            this.logError();
        }
    },

    logError: function() {
        log("OnClickOutsideMixin.componentDidMount",
            "Component lacks a handleClickOutside(event) function for processing outside click events.");
    }
};

module.exports = OnClickOutsideMixin;
