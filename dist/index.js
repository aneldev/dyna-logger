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

Object.defineProperty(exports, "__esModule", { value: true });
const eventemitter3_1 = __webpack_require__(1);
class DynaLogger extends eventemitter3_1.EventEmitter {
    constructor(settings = {}) {
        super();
        this._logs = [];
        this.events = {
            log: 'log',
        };
        this.types = {
            log: 'log',
            info: 'info',
            error: 'error',
            warn: 'warn',
            debug: 'debug',
        };
        this.setSettings(settings);
    }
    setSettings(settings = {}) {
        this._settings = Object.assign({ bufferLimit: 5000, consoleLogs: true, consoleInfoLogs: true, consoleErrorLogs: true, consoleWarnLogs: true, consoleDebugLogs: true, keepLogs: true, keepInfoLogs: true, keepErrorLogs: true, keepWarnLogs: true, keepDebugLogs: true }, settings);
    }
    get logs() {
        return [].concat(this._logs);
    }
    log(section, message, data = null) {
        this._log('log', section, message, data);
    }
    info(section, message, data = null) {
        this._log('info', section, message, data);
    }
    error(section, message, data = null) {
        this._log('error', section, message, data);
    }
    warn(section, message, data = null) {
        this._log('warn', section, message, data);
    }
    debug(section, message, data = null) {
        this._log('debug', section, message, data);
    }
    clear(type) {
        if (type)
            this._logs = this.logs.filter((log) => log.type !== type);
        else
            this._logs = [];
    }
    _log(type, section, text_ = '', data) {
        const now = new Date();
        const text = this._createMessage(section, type, text_, now);
        const log = { date: now, type, text, data, raw: text_ };
        const consoleParams = [text];
        if (data)
            consoleParams.push(data);
        // add to _logs
        if (type == 'log' && this._settings.keepLogs)
            this._logs.push(log);
        if (type == 'info' && this._settings.keepInfoLogs)
            this._logs.push(log);
        if (type == 'error' && this._settings.keepErrorLogs)
            this._logs.push(log);
        if (type == 'warn' && this._settings.keepWarnLogs)
            this._logs.push(log);
        if (type == 'debug' && this._settings.keepDebugLogs)
            this._logs.push(log);
        // console it
        if (type == 'log' && this._settings.consoleLogs)
            console.log(...consoleParams);
        if (type == 'info' && this._settings.consoleInfoLogs)
            console.log(...consoleParams);
        if (type == 'error' && this._settings.consoleErrorLogs)
            console.error(...consoleParams);
        if (type == 'warn' && this._settings.consoleWarnLogs)
            console.warn(...consoleParams);
        if (type == 'debug' && this._settings.consoleDebugLogs)
            (console.debug || console.log)(...consoleParams);
        // keep the bufferLimit
        if (this._settings.bufferLimit > -1) {
            // clean up
            while (this._logs.length > this._settings.bufferLimit)
                this._logs.shift();
            // set the older with a proper message
            if (this._settings.bufferLimit > 0 && this._logs.length === this._settings.bufferLimit) {
                this._logs[0] = {
                    date: this._logs[0].date,
                    type: this.types.warn,
                    text: `--- previous logs deleted due to bufferLimit: ${this._settings.bufferLimit}`,
                    data: { settings: this._settings }
                };
            }
        }
        this.emit(this.events.log, log);
    }
    _createMessage(section, type, text, date) {
        return `[${section}] ${date.toLocaleString()} (${type})${text ? ' ' + text : ''}`;
    }
}
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