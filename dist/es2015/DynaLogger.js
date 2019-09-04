var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import "dyna-universal";
var universal = dynaUniversal.universal;
export var ELogType;
(function (ELogType) {
    ELogType["LOG"] = "LOG";
    ELogType["INFO"] = "INFO";
    ELogType["ERROR"] = "ERROR";
    ELogType["WARN"] = "WARN";
    ELogType["DEBUG"] = "DEBUG";
})(ELogType || (ELogType = {}));
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
        this._realConsole = __assign({}, universal.console);
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
        universal.console.log = function () {
            var params = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                params[_i] = arguments[_i];
            }
            return _this._log(ELogType.LOG, null, params, null, false);
        };
        universal.console.info = function () {
            var params = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                params[_i] = arguments[_i];
            }
            return _this._log(ELogType.INFO, null, params, null, false);
        };
        universal.console.error = function () {
            var params = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                params[_i] = arguments[_i];
            }
            return _this._log(ELogType.ERROR, null, params, null, false);
        };
        universal.console.warn = function () {
            var params = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                params[_i] = arguments[_i];
            }
            return _this._log(ELogType.WARN, null, params, null, false);
        };
        universal.console.debug = function () {
            var params = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                params[_i] = arguments[_i];
            }
            return _this._log(ELogType.DEBUG, null, params, null, false);
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
            return this._logs.concat();
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
        var now = new Date();
        var consoleOutput = [];
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
        var log = {
            date: now,
            type: type,
            content: [consoleOutput],
        };
        if (data)
            log.content.push(data);
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
        if (this._config.bufferLimit !== undefined && this._config.bufferLimit > -1) {
            // clean up
            while (this._logs.length > this._config.bufferLimit)
                this._logs.shift();
            // set the older with a proper message
            if (this._config.bufferLimit > 0 && this._logs.length === this._config.bufferLimit) {
                this._logs[0] = {
                    date: this._logs[0].date,
                    type: ELogType.WARN,
                    content: ["--- previous logs deleted due to bufferLimit: " + this._config.bufferLimit, { config: this._config }],
                };
            }
        }
        if (this._config.onLog)
            this._config.onLog(log);
    };
    return DynaLogger;
}());
export { DynaLogger };
//# sourceMappingURL=DynaLogger.js.map