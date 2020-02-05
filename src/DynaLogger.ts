import "dyna-universal";

declare const dynaUniversal: any;
const universal: any = dynaUniversal.universal;

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

export enum ELogType {
  LOG = 'LOG',
  INFO = 'INFO',
  ERROR = 'ERROR',
  WARN = 'WARN',
  DEBUG = 'DEBUG',
}

export class DynaLogger {
  constructor(config: IDynaLoggerConfig = {}) {
    this.setConfig(config);
    if (this._config.replaceGlobalLogMethods) {
      this._replaceGlobalLog();
    }
  }

  private _config: IDynaLoggerConfig = {
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
    onLog: (log: ILog) => undefined,
  };
  private _logs: ILog[] = [];

  public setConfig(config: IDynaLoggerConfig = {}): void {
    this._config = {
      ...this._config,
      ...config,
    };
  }

  private _realConsole: Console = {...universal.console};

  public destroy(): void {
    if (this._config.replaceGlobalLogMethods) {
      this._restoreGlobalLog();
    }
  }

  private _replaceGlobalLog(): void {
    universal.console.log = (...params: any[]): void => this._log(ELogType.LOG, null, params, null, false);
    universal.console.info = (...params: any[]): void => this._log(ELogType.INFO, null, params, null, false);
    universal.console.error = (...params: any[]): void => this._log(ELogType.ERROR, null, params, null, false);
    universal.console.warn = (...params: any[]): void => this._log(ELogType.WARN, null, params, null, false);
    universal.console.debug = (...params: any[]): void => this._log(ELogType.DEBUG, null, params, null, false);
  }

  private _restoreGlobalLog(): void {
    universal.console.log = this._realConsole.log;
    universal.console.info = this._realConsole.info;
    universal.console.debug = this._realConsole.debug;
    universal.console.error = this._realConsole.error;
    universal.console.warn = this._realConsole.warn;
  }

  public get logs(): ILog[] {
    return this._logs.concat();
  }

  public log(section: string, message: string, data: any = null): void {
    this._log(ELogType.LOG, section, message, data);
  }

  public info(section: string, message: string, data: any = null): void {
    this._log(ELogType.INFO, section, message, data);
  }

  public error(section: string, message: string, data: any = null): void {
    this._log(ELogType.ERROR, section, message, data);
  }

  public warn(section: string, message: string, data: any = null): void {
    this._log(ELogType.WARN, section, message, data);
  }

  public debug(section: string, message: string, data: any = null): void {
    this._log(ELogType.DEBUG, section, message, data);
  }

  public clear(type?: string): void {
    if (type)
      this._logs = this.logs.filter((log: ILog) => log.type !== type);
    else
      this._logs = [];
  }

  private _log(
    type: ELogType,
    section: null | string,
    text_: string | any[] = '',
    data?: any,
    consoleTheData: boolean = true,
  ): void {
    const now: Date = new Date();
    let consoleOutput: any[] = [];

    let userText: any[];
    if (Array.isArray(text_)) userText = text_; else userText = [text_];

    if (this._config.consoleLogType) consoleOutput.push(type);
    if (section) consoleOutput.push(section);
    if (this._config.consoleTimestamp) consoleOutput.push(now.toLocaleString());
    consoleOutput = consoleOutput.concat(userText);

    const log: ILog = {
      date: now,
      type,
      content: consoleOutput.concat(),
    };
    if (data) log.content.push(data);

    if (data && consoleTheData) consoleOutput.push(data);

    // add to _logs
    if (type == ELogType.LOG && this._config.keepLogs) this._logs.push(log);
    if (type == ELogType.INFO && this._config.keepInfoLogs) this._logs.push(log);
    if (type == ELogType.ERROR && this._config.keepErrorLogs) this._logs.push(log);
    if (type == ELogType.WARN && this._config.keepWarnLogs) this._logs.push(log);
    if (type == ELogType.DEBUG && this._config.keepDebugLogs) this._logs.push(log);

    // console it
    if (type == ELogType.LOG && this._config.consoleLogs && this._realConsole.log) this._realConsole.log(...consoleOutput);
    if (type == ELogType.INFO && this._config.consoleInfoLogs && this._realConsole.info) this._realConsole.info(...consoleOutput);
    if (type == ELogType.ERROR && this._config.consoleErrorLogs && this._realConsole.error) this._realConsole.error(...consoleOutput);
    if (type == ELogType.WARN && this._config.consoleWarnLogs && this._realConsole.warn) this._realConsole.warn(...consoleOutput);
    if (type == ELogType.DEBUG && this._config.consoleDebugLogs && this._realConsole.debug) (this._realConsole.debug)(...consoleOutput);

    // keep the bufferLimit
    if (this._config.bufferLimit !== undefined && this._config.bufferLimit > -1) {
      // clean up
      while (this._logs.length > this._config.bufferLimit) this._logs.shift();
      // set the older with a proper message
      if (this._config.bufferLimit > 0 && this._logs.length === this._config.bufferLimit) {
        this._logs[0] = {
          date: this._logs[0].date,
          type: ELogType.WARN,
          content: [`--- previous logs deleted due to bufferLimit: ${this._config.bufferLimit}`, {config: this._config}],
        } as ILog;
      }
    }

    if (this._config.onLog) this._config.onLog(log);
  }
}
