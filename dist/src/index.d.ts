export interface IConfig {
    bufferLimit?: number;
    consoleLogs?: boolean;
    consoleInfoLogs?: boolean;
    consoleErrorLogs?: boolean;
    consoleWarnLogs?: boolean;
    consoleDebugLogs?: boolean;
    consoleLogType?: boolean;
    consoleTimestamp?: boolean;
    keepLogs?: boolean;
    keepInfoLogs?: boolean;
    keepErrorLogs?: boolean;
    keepWarnLogs?: boolean;
    keepDebugLogs?: boolean;
    replaceGlobalLogMethods?: boolean;
    onLog?: (log: ILog) => void;
}
export interface ILog {
    date: Date;
    type: ELogType;
    text: string;
    data: any;
}
export declare enum ELogType {
    LOG = "LOG",
    INFO = "INFO",
    ERROR = "ERROR",
    WARN = "WARN",
    DEBUG = "DEBUG",
}
export declare class DynaLogger {
    constructor(config?: IConfig);
    private _config;
    private _logs;
    setConfig(config?: IConfig): void;
    private _realConsole;
    destroy(): void;
    private _replaceGlobalLog();
    private _restoreGlobalLog();
    readonly logs: ILog[];
    log(section: string, message: string, data?: any): void;
    info(section: string, message: string, data?: any): void;
    error(section: string, message: string, data?: any): void;
    warn(section: string, message: string, data?: any): void;
    debug(section: string, message: string, data?: any): void;
    clear(type?: string): void;
    private _log(type, section, text_?, data?);
    private _stringifyConsoleParams(params);
}
