(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("eventemitter3"));
	else if(typeof define === 'function' && define.amd)
		define("dyna-logger", ["eventemitter3"], factory);
	else if(typeof exports === 'object')
		exports["dyna-logger"] = factory(require("eventemitter3"));
	else
		root["dyna-logger"] = factory(root["eventemitter3"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var eventemitter3_1 = __webpack_require__(1);
var DynaLogger = (function (_super) {
    __extends(DynaLogger, _super);
    function DynaLogger(config) {
        if (config === void 0) { config = {}; }
        var _this = _super.call(this) || this;
        _this._logs = [];
        _this.events = {
            log: 'log',
        };
        _this.types = {
            log: 'log',
            info: 'info',
            error: 'error',
            warn: 'warn',
            debug: 'debug',
        };
        _this.setConfig(config);
        return _this;
    }
    DynaLogger.prototype.setConfig = function (config) {
        if (config === void 0) { config = {}; }
        this._config = __assign({ bufferLimit: 5000, consoleLogs: true, consoleInfoLogs: true, consoleErrorLogs: true, consoleWarnLogs: true, consoleDebugLogs: true, keepLogs: true, keepInfoLogs: true, keepErrorLogs: true, keepWarnLogs: true, keepDebugLogs: true }, config);
    };
    Object.defineProperty(DynaLogger.prototype, "logs", {
        get: function () {
            return [].concat(this._logs);
        },
        enumerable: true,
        configurable: true
    });
    DynaLogger.prototype.log = function (section, message, data) {
        if (data === void 0) { data = null; }
        this._log('log', section, message, data);
    };
    DynaLogger.prototype.info = function (section, message, data) {
        if (data === void 0) { data = null; }
        this._log('info', section, message, data);
    };
    DynaLogger.prototype.error = function (section, message, data) {
        if (data === void 0) { data = null; }
        this._log('error', section, message, data);
    };
    DynaLogger.prototype.warn = function (section, message, data) {
        if (data === void 0) { data = null; }
        this._log('warn', section, message, data);
    };
    DynaLogger.prototype.debug = function (section, message, data) {
        if (data === void 0) { data = null; }
        this._log('debug', section, message, data);
    };
    DynaLogger.prototype.clear = function (type) {
        if (type)
            this._logs = this.logs.filter(function (log) { return log.type !== type; });
        else
            this._logs = [];
    };
    DynaLogger.prototype._log = function (type, section, text_, data) {
        if (text_ === void 0) { text_ = ''; }
        var now = new Date();
        var text = this._createMessage(section, type, text_, now);
        var log = { date: now, type: type, text: text, data: data, raw: text_ };
        var consoleParams = [text];
        if (data)
            consoleParams.push(data);
        // add to _logs
        if (type == 'log' && this._config.keepLogs)
            this._logs.push(log);
        if (type == 'info' && this._config.keepInfoLogs)
            this._logs.push(log);
        if (type == 'error' && this._config.keepErrorLogs)
            this._logs.push(log);
        if (type == 'warn' && this._config.keepWarnLogs)
            this._logs.push(log);
        if (type == 'debug' && this._config.keepDebugLogs)
            this._logs.push(log);
        // console it
        if (type == 'log' && this._config.consoleLogs)
            console.log.apply(console, consoleParams);
        if (type == 'info' && this._config.consoleInfoLogs)
            console.log.apply(console, consoleParams);
        if (type == 'error' && this._config.consoleErrorLogs)
            console.log.apply(console, consoleParams);
        if (type == 'warn' && this._config.consoleWarnLogs)
            console.log.apply(console, consoleParams);
        if (type == 'debug' && this._config.consoleDebugLogs)
            console.log.apply(console, consoleParams);
        // keep the bufferLimit
        if (this._config.bufferLimit > -1) {
            // clean up
            while (this._logs.length > this._config.bufferLimit)
                this._logs.shift();
            // set the older with a proper message
            if (this._config.bufferLimit > 0 && this._logs.length === this._config.bufferLimit) {
                this._logs[0] = {
                    date: this._logs[0].date,
                    type: this.types.warn,
                    text: "--- previous logs deleted due to bufferLimit: " + this._config.bufferLimit,
                    data: { config: this._config }
                };
            }
        }
        this.emit(this.events.log, log);
    };
    DynaLogger.prototype._createMessage = function (section, type, text, date) {
        return "[" + section + "] " + date.toLocaleString() + " (" + type + ")" + (text ? ' ' + text : '');
    };
    return DynaLogger;
}(eventemitter3_1.EventEmitter));
exports.DynaLogger = DynaLogger;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("eventemitter3");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ })
/******/ ]);
});