/*globals console*/

var Logger = (function () {
    var that = {};
    var _    = {};
    
    that.FATAL   = 1;
    that.ERROR   = 2;
    that.WARNING = 3;
    that.INFO    = 4;
    that.DEBUG   = 5;
    that.TRACE   = 6;
    
    _.verbosity = that.WARNING;
    
    // TODO Make usage of colors configurable
    _.colors = {
        /*"TRACE" : {
            text : '#040404',
            background : '#eeeeee'
        },
        "DEBUG" : {
            text : '#040404',
            background : '#eeffee'
        }*/
    };
    
    _.prepareArguments = function (theArguments) {
        var my_arguments = Array.prototype.slice.call(theArguments); // Convert arguments to an Array
        return my_arguments;
    };
    
    _.getLevelPrefix = function (theLevelName) {
        return '[' + theLevelName + '] ';
    };
    
    _.augmentArgs = function (theArgs, theLevelName) {
        var myLevelName = _.getLevelPrefix(theLevelName);
        if (theArgs.length > 0 &&
            typeof(theArgs[0]) === 'string') {
            theArgs[0] = myLevelName + theArgs[0];
        } else {
            theArgs.unshift(myLevelName);
        }
        if (theLevelName in _.colors) {
            theArgs[0] = "%c" + theArgs[0];
            theArgs.splice(1, 0, 'color:' + _.colors[theLevelName].text + '; background-color:' + _.colors[theLevelName].background);
        }
        
    };
    
    _.logError = function (theArguments) {
        //console.exception.apply(console, theArguments);
        console.error.apply(console, theArguments);
        console.groupCollapsed("traceback");
        console.trace();
        console.groupEnd();
    };
    
    ////////////
    // Public //
    ////////////
    
    // fatal and error cannot be filtered
    that.filter = null;
    
    that.fatal = function () {
        if (typeof console !== "undefined" &&
            _.verbosity >= that.FATAL) {
            var my_arguments = _.prepareArguments(arguments);
            _.augmentArgs(my_arguments, "FATAL");
            _.logError(my_arguments);
        }
    };
    
    that.error = function () {
        if (typeof console !== "undefined" &&
            _.verbosity >= that.ERROR) {
            var my_arguments = _.prepareArguments(arguments);
            _.augmentArgs(my_arguments, "ERROR");
            _.logError(my_arguments);
        }
    };
    
    that.warn = function () {
        if (typeof console !== "undefined" &&
            _.verbosity >= that.WARNING) {
            var my_arguments = _.prepareArguments(arguments);
            if (typeof(that.filter) === 'function' &&
                that.filter(my_arguments, "WARN")) {
                return;
            }
            _.augmentArgs(my_arguments, "WARN");
            console.warn.apply(console, my_arguments);
        }
    };
    that.warning = that.warn; // compatible to y60-logger
    
    that.info = function () {
        if (typeof console !== "undefined" &&
            _.verbosity >= that.INFO) {
            var my_arguments = _.prepareArguments(arguments);
            if (typeof(that.filter) === 'function' &&
                that.filter(my_arguments, "INFO")) {
                return;
            }
            _.augmentArgs(my_arguments, "INFO");
            console.info.apply(console, my_arguments);
        }
    };
    
    that.debug = function () {
        if (typeof console !== "undefined" &&
            _.verbosity >= that.DEBUG) {
            var my_arguments = _.prepareArguments(arguments);
            if (typeof(that.filter) === 'function' &&
                that.filter(my_arguments, "DEBUG")) {
                return;
            }
            _.augmentArgs(my_arguments, "DEBUG");
            console.info.apply(console, my_arguments);
        }
    };
    
    that.trace = function () {
        if (typeof console !== "undefined" &&
            _.verbosity >= that.TRACE) {
            var my_arguments = _.prepareArguments(arguments);
            if (typeof(that.filter) === 'function' &&
                that.filter(my_arguments, "TRACE")) {
                return;
            }
            _.augmentArgs(my_arguments, "TRACE");
            console.info.apply(console, my_arguments);
        }
    };
    
    that.__defineGetter__("verbosity", function () {
        return _.verbosity;
    });

    that.__defineSetter__("verbosity", function (theVerbosity) {
        // Validate verbosity is a valid one
        _.verbosity = theVerbosity;
    });
    
    
    return that;
}());