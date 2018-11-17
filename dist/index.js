(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("dyna-logger", [], factory);
	else if(typeof exports === 'object')
		exports["dyna-logger"] = factory();
	else
		root["dyna-logger"] = factory();
})(global, function() {
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/DynaLogger.ts":
/*!***************************!*\
  !*** ./src/DynaLogger.ts ***!
  \***************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(/*! dyna-universal */ "dyna-universal");

var universal = dynaUniversal.universal;
var ELogType;

(function (ELogType) {
  ELogType["LOG"] = "LOG";
  ELogType["INFO"] = "INFO";
  ELogType["ERROR"] = "ERROR";
  ELogType["WARN"] = "WARN";
  ELogType["DEBUG"] = "DEBUG";
})(ELogType = exports.ELogType || (exports.ELogType = {}));

var DynaLogger =
/** @class */
function () {
  function DynaLogger(config) {
    if (config === void 0) {
      config = {};
    }

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
      onLog: function (log) {
        return undefined;
      }
    };
    this._logs = [];
    this._realConsole = __assign({}, universal.console);
    this.setConfig(config);

    if (this._config.replaceGlobalLogMethods) {
      this._replaceGlobalLog();
    }
  }

  DynaLogger.prototype.setConfig = function (config) {
    if (config === void 0) {
      config = {};
    }

    this._config = __assign({}, this._config, config);
  };

  DynaLogger.prototype.destroy = function () {
    if (this._config.replaceGlobalLogMethods) {
      this._restoreGlobalLog();
    }
  };

  DynaLogger.prototype._replaceGlobalLog = function () {
    var _this = this;

    universal.console.log = function () {
      var params = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        params[_i] = arguments[_i];
      }

      return _this._log(ELogType.LOG, null, params, params, false);
    };

    universal.console.info = function () {
      var params = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        params[_i] = arguments[_i];
      }

      return _this._log(ELogType.INFO, null, params, params, false);
    };

    universal.console.error = function () {
      var params = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        params[_i] = arguments[_i];
      }

      return _this._log(ELogType.ERROR, null, params, params, false);
    };

    universal.console.warn = function () {
      var params = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        params[_i] = arguments[_i];
      }

      return _this._log(ELogType.WARN, null, params, params, false);
    };

    universal.console.debug = function () {
      var params = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        params[_i] = arguments[_i];
      }

      return _this._log(ELogType.DEBUG, null, params, params, false);
    };
  };

  DynaLogger.prototype._restoreGlobalLog = function () {
    universal.console.log = this._realConsole.log;
    universal.console.info = this._realConsole.info;
    universal.console.debug = this._realConsole.debug;
    universal.console.error = this._realConsole.error;
    universal.console.warn = this._realConsole.warn;
  };

  Object.defineProperty(DynaLogger.prototype, "logs", {
    get: function () {
      return [].concat(this._logs);
    },
    enumerable: true,
    configurable: true
  });

  DynaLogger.prototype.log = function (section, message, data) {
    if (data === void 0) {
      data = null;
    }

    this._log(ELogType.LOG, section, message, data);
  };

  DynaLogger.prototype.info = function (section, message, data) {
    if (data === void 0) {
      data = null;
    }

    this._log(ELogType.INFO, section, message, data);
  };

  DynaLogger.prototype.error = function (section, message, data) {
    if (data === void 0) {
      data = null;
    }

    this._log(ELogType.ERROR, section, message, data);
  };

  DynaLogger.prototype.warn = function (section, message, data) {
    if (data === void 0) {
      data = null;
    }

    this._log(ELogType.WARN, section, message, data);
  };

  DynaLogger.prototype.debug = function (section, message, data) {
    if (data === void 0) {
      data = null;
    }

    this._log(ELogType.DEBUG, section, message, data);
  };

  DynaLogger.prototype.clear = function (type) {
    if (type) this._logs = this.logs.filter(function (log) {
      return log.type !== type;
    });else this._logs = [];
  };

  DynaLogger.prototype._log = function (type, section, text_, data, consoleTheData) {
    if (text_ === void 0) {
      text_ = '';
    }

    if (consoleTheData === void 0) {
      consoleTheData = true;
    }

    var _a, _b, _c, _d, _e;

    var consoleOutput = [];
    var now = new Date();
    var userText;
    if (Array.isArray(text_)) userText = text_;else userText = [text_];
    if (this._config.consoleLogType) consoleOutput.push(type);
    if (section) consoleOutput.push(section);
    if (this._config.consoleTimestamp) consoleOutput.push(now.toLocaleString());
    consoleOutput = consoleOutput.concat(userText);
    var log = {
      date: now,
      type: type,
      text: this._stringifyConsoleParams(consoleOutput),
      data: data
    };
    if (data && consoleTheData) consoleOutput.push(data); // add to _logs

    if (type == ELogType.LOG && this._config.keepLogs) this._logs.push(log);
    if (type == ELogType.INFO && this._config.keepInfoLogs) this._logs.push(log);
    if (type == ELogType.ERROR && this._config.keepErrorLogs) this._logs.push(log);
    if (type == ELogType.WARN && this._config.keepWarnLogs) this._logs.push(log);
    if (type == ELogType.DEBUG && this._config.keepDebugLogs) this._logs.push(log); // console it

    if (type == ELogType.LOG && this._config.consoleLogs && this._realConsole.log) (_a = this._realConsole).log.apply(_a, consoleOutput);
    if (type == ELogType.INFO && this._config.consoleInfoLogs && this._realConsole.info) (_b = this._realConsole).info.apply(_b, consoleOutput);
    if (type == ELogType.ERROR && this._config.consoleErrorLogs && this._realConsole.error) (_c = this._realConsole).error.apply(_c, consoleOutput);
    if (type == ELogType.WARN && this._config.consoleWarnLogs && this._realConsole.warn) (_d = this._realConsole).warn.apply(_d, consoleOutput);
    if (type == ELogType.DEBUG && this._config.consoleDebugLogs && this._realConsole.debug) (_e = this._realConsole).debug.apply(_e, consoleOutput); // keep the bufferLimit

    if (this._config.bufferLimit > -1) {
      // clean up
      while (this._logs.length > this._config.bufferLimit) this._logs.shift(); // set the older with a proper message


      if (this._config.bufferLimit > 0 && this._logs.length === this._config.bufferLimit) {
        this._logs[0] = {
          date: this._logs[0].date,
          type: ELogType.WARN,
          text: "--- previous logs deleted due to bufferLimit: " + this._config.bufferLimit,
          data: {
            config: this._config
          }
        };
      }
    }

    this._config.onLog(log);
  };

  DynaLogger.prototype._stringifyConsoleParams = function (params) {
    return params.reduce(function (acc, value) {
      if (acc.length) acc += " ";
      if (typeof value === "string") acc += value;else acc += String(value);
      return acc;
    }, '');
  };

  return DynaLogger;
}();

exports.DynaLogger = DynaLogger;

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function __export(m) {
  for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}

Object.defineProperty(exports, "__esModule", {
  value: true
});

__export(__webpack_require__(/*! ./DynaLogger */ "./src/DynaLogger.ts"));

console.error("\ndyna-logger: Import error\nYou should import with lazy load (webpack's import()) the \"dyna-logger/web\" or the \"dyna-logger/node\" version according the runtime environment.\nFor typescript, you should import also on top the \"dyna-logger\" but on runtime you shouldn't see this error since this import is not part of the compiled code.\n");

/***/ }),

/***/ "dyna-universal":
/*!*********************************!*\
  !*** external "dyna-universal" ***!
  \*********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = require("dyna-universal");

/***/ })

/******/ });
});
//# sourceMappingURL=index.js.map