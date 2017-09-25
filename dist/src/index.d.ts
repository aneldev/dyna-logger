import { EventEmitter } from 'eventemitter3';
export interface ILog {
    date: Date;
    type: string;
    text: string;
    raw: string;
    data: any;
}
export interface ITypes {
    log: string;
    info: string;
    error: string;
    warn: string;
    debug: string;
}
export interface ISettings {
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
}
export declare class DynaLogger extends EventEmitter {
    constructor(settings?: ISettings);
    private _settings;
    private _logs;
    events: any;
    types: ITypes;
    readonly logs: ILog[];
    log(section: string, message: string, data?: any): void;
    info(section: string, message: string, data?: any): void;
    error(section: string, message: string, data?: any): void;
    warn(section: string, message: string, data?: any): void;
    debug(section: string, message: string, data?: any): void;
    clear(type?: string): void;
    private _log(type, section, text_?, data?);
    private _createMessage(section, type, text, date);
}