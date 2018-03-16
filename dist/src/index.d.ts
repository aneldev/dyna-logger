import { EventEmitter } from 'eventemitter3';
export interface ILog {
    date: Date;
    type: ELogTypes;
    text: string;
    raw: any[];
    data: any;
}
export declare enum ELogTypes {
    LOG = "LOG",
    INFO = "INFO",
    ERROR = "ERROR",
    WARN = "WARN",
    DEBUG = "DEBUG",
}
export interface IConfig {
    bufferLimit?: number;
    consoleLogs?: boolean;
    consoleInfoLogs?: boolean;
    consoleErrorLogs?: boolean;
    consoleWarnLogs?: boolean;
    consoleDebugLogs?: boolean;
    keepLogs?: boolean;
    keepInfoLogs?: boolean;
    keepErrorLogs?: boolean;
    keepWarnLogs?: boolean;
    keepDebugLogs?: boolean;
    replaceGlobalLogMethods?: boolean;
}
export interface IEvents {
    log: string;
}
export declare class DynaLogger extends EventEmitter {
    constructor(config?: IConfig);
    private _config;
    private _logs;
    setConfig(config?: IConfig): void;
    private _realConsole;
    destroy(): void;
    events: IEvents;
    private _replaceGlobalLog();
    private _restoreGlobalLog();
    private _stringifyConsoleParams(params);
    readonly logs: ILog[];
    log(section: string, message: string, data?: any): void;
    info(section: string, message: string, data?: any): void;
    error(section: string, message: string, data?: any): void;
    warn(section: string, message: string, data?: any): void;
    debug(section: string, message: string, data?: any): void;
    clear(type?: string): void;
    private _log(type, section, text_?, data?);
}
