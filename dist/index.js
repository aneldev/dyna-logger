(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("dyna-universal"));
	else if(typeof define === 'function' && define.amd)
		define("dyna-logger", ["dyna-universal"], factory);
	else if(typeof exports === 'object')
		exports["dyna-logger"] = factory(require("dyna-universal"));
	else
		root["dyna-logger"] = factory(root["dyna-universal"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("dyna-universal");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var dyna_universal_1 = __webpack_require__(0);
var ELogType;
(function (ELogType) {
    ELogType["LOG"] = "LOG";
    ELogType["INFO"] = "INFO";
    ELogType["ERROR"] = "ERROR";
    ELogType["WARN"] = "WARN";
    ELogType["DEBUG"] = "DEBUG";
})(ELogType = exports.ELogType || (exports.ELogType = {}));
var DynaLogger = /** @class */ (function () {
    function DynaLogger(config) {
        if (config === void 0) { config = {}; }
        this._config = {
            bufferLimit: 5000,
            consoleLogs: true,
            consoleInfoLogs: true,
            consoleErrorLogs: true,
            consoleWarnLogs: true,
            consoleDebugLogs: true,
            consoleLogType: true,
            consoleTimestamp: true,
            keepLogs: true,
            keepInfoLogs: true,
            keepErrorLogs: true,
            keepWarnLogs: true,
            keepDebugLogs: true,
            replaceGlobalLogMethods: false,
            onLog: function (log) { return undefined; },
        };
        this._logs = [];
        this._realConsole = __assign({}, dyna_universal_1.universal.console);
        this.setConfig(config);
        if (this._config.replaceGlobalLogMethods) {
            this._replaceGlobalLog();
        }
    }
    DynaLogger.prototype.setConfig = function (config) {
        if (config === void 0) { config = {}; }
        this._config = __assign({}, this._config, config);
    };
    DynaLogger.prototype.destroy = function () {
        if (this._config.replaceGlobalLogMethods) {
            this._restoreGlobalLog();
        }
    };
    DynaLogger.prototype._replaceGlobalLog = function () {
        var _this = this;
        dyna_universal_1.universal.console.log = function () {
            var params = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                params[_i] = arguments[_i];
            }
            return _this._log(ELogType.LOG, null, params, params, false);
        };
        dyna_universal_1.universal.console.info = function () {
            var params = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                params[_i] = arguments[_i];
            }
            return _this._log(ELogType.INFO, null, params, params, false);
        };
        dyna_universal_1.universal.console.error = function () {
            var params = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                params[_i] = arguments[_i];
            }
            return _this._log(ELogType.ERROR, null, params, params, false);
        };
        dyna_universal_1.universal.console.warn = function () {
            var params = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                params[_i] = arguments[_i];
            }
            return _this._log(ELogType.WARN, null, params, params, false);
        };
        dyna_universal_1.universal.console.debug = function () {
            var params = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                params[_i] = arguments[_i];
            }
            return _this._log(ELogType.DEBUG, null, params, params, false);
        };
    };
    DynaLogger.prototype._restoreGlobalLog = function () {
        dyna_universal_1.universal.console.log = this._realConsole.log;
        dyna_universal_1.universal.console.info = this._realConsole.info;
        dyna_universal_1.universal.console.debug = this._realConsole.debug;
        dyna_universal_1.universal.console.error = this._realConsole.error;
        dyna_universal_1.universal.console.warn = this._realConsole.warn;
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
        this._log(ELogType.LOG, section, message, data);
    };
    DynaLogger.prototype.info = function (section, message, data) {
        if (data === void 0) { data = null; }
        this._log(ELogType.INFO, section, message, data);
    };
    DynaLogger.prototype.error = function (section, message, data) {
        if (data === void 0) { data = null; }
        this._log(ELogType.ERROR, section, message, data);
    };
    DynaLogger.prototype.warn = function (section, message, data) {
        if (data === void 0) { data = null; }
        this._log(ELogType.WARN, section, message, data);
    };
    DynaLogger.prototype.debug = function (section, message, data) {
        if (data === void 0) { data = null; }
        this._log(ELogType.DEBUG, section, message, data);
    };
    DynaLogger.prototype.clear = function (type) {
        if (type)
            this._logs = this.logs.filter(function (log) { return log.type !== type; });
        else
            this._logs = [];
    };
    DynaLogger.prototype._log = function (type, section, text_, data, consoleTheData) {
        if (text_ === void 0) { text_ = ''; }
        if (consoleTheData === void 0) { consoleTheData = true; }
        var _a, _b, _c, _d, _e;
        var consoleOutput = [];
        var now = new Date();
        var userText;
        if (Array.isArray(text_))
            userText = text_;
        else
            userText = [text_];
        if (this._config.consoleLogType)
            consoleOutput.push(type);
        if (section)
            consoleOutput.push(section);
        if (this._config.consoleTimestamp)
            consoleOutput.push(now.toLocaleString());
        consoleOutput = consoleOutput.concat(userText);
        var log = { date: now, type: type, text: this._stringifyConsoleParams(consoleOutput), data: data };
        if (data && consoleTheData)
            consoleOutput.push(data);
        // add to _logs
        if (type == ELogType.LOG && this._config.keepLogs)
            this._logs.push(log);
        if (type == ELogType.INFO && this._config.keepInfoLogs)
            this._logs.push(log);
        if (type == ELogType.ERROR && this._config.keepErrorLogs)
            this._logs.push(log);
        if (type == ELogType.WARN && this._config.keepWarnLogs)
            this._logs.push(log);
        if (type == ELogType.DEBUG && this._config.keepDebugLogs)
            this._logs.push(log);
        // console it
        if (type == ELogType.LOG && this._config.consoleLogs && this._realConsole.log)
            (_a = this._realConsole).log.apply(_a, consoleOutput);
        if (type == ELogType.INFO && this._config.consoleInfoLogs && this._realConsole.info)
            (_b = this._realConsole).info.apply(_b, consoleOutput);
        if (type == ELogType.ERROR && this._config.consoleErrorLogs && this._realConsole.error)
            (_c = this._realConsole).error.apply(_c, consoleOutput);
        if (type == ELogType.WARN && this._config.consoleWarnLogs && this._realConsole.warn)
            (_d = this._realConsole).warn.apply(_d, consoleOutput);
        if (type == ELogType.DEBUG && this._config.consoleDebugLogs && this._realConsole.debug)
            (_e = this._realConsole).debug.apply(_e, consoleOutput);
        // keep the bufferLimit
        if (this._config.bufferLimit > -1) {
            // clean up
            while (this._logs.length > this._config.bufferLimit)
                this._logs.shift();
            // set the older with a proper message
            if (this._config.bufferLimit > 0 && this._logs.length === this._config.bufferLimit) {
                this._logs[0] = {
                    date: this._logs[0].date,
                    type: ELogType.WARN,
                    text: "--- previous logs deleted due to bufferLimit: " + this._config.bufferLimit,
                    data: { config: this._config }
                };
            }
        }
        this._config.onLog(log);
    };
    DynaLogger.prototype._stringifyConsoleParams = function (params) {
        return params.reduce(function (acc, value) {
            if (acc.length)
                acc += " ";
            if (typeof value === "string")
                acc += value;
            else
                acc += String(value);
            return acc;
        }, '');
    };
    return DynaLogger;
}());
exports.DynaLogger = DynaLogger;


/***/ })
/******/ ]);
});