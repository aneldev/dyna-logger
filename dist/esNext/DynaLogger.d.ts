import "dyna-universal";
export interface IDynaLoggerConfig {
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
    content: any;
}
export declare enum ELogType {
    LOG = "LOG",
    INFO = "INFO",
    ERROR = "ERROR",
    WARN = "WARN",
    DEBUG = "DEBUG"
}
export declare class DynaLogger {
    constructor(config?: IDynaLoggerConfig);
    private _config;
    private _logs;
    setConfig(config?: IDynaLoggerConfig): void;
    private _realConsole;
    destroy(): void;
    private _replaceGlobalLog;
    private _restoreGlobalLog;
    get logs(): ILog[];
    log(section: string, message: string, data?: any): void;
    info(section: string, message: string, data?: any): void;
    error(section: string, message: string, data?: any): void;
    warn(section: string, message: string, data?: any): void;
    debug(section: string, message: string, data?: any): void;
    clear(type?: string): void;
    private _log;
}
