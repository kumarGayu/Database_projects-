/** @jsx React.DOM */
"use strict";

var moment = require("moment");

/**
 * Logs to console
 *
 * @memberof nWidgets.utils
 *
 * @param {string} caller    Name of the Class and function that called this function
 * @param {object} arguments One or more arguments to be logged (object/string/integer)
 */
var log = function(caller) {
    if (typeof console === "object" && typeof console.log === "function" &&
        typeof window.__karma__ === "undefined") {
        var timestamp = moment().format("DD.MM.YYYY hh:mm:ss");
        var text = timestamp + ": " + caller + ":";
        var args = Array.prototype.slice.call(arguments, 0);

        args[0] = text;

        console.log.apply(console, args);
    }
};

module.exports = log;
