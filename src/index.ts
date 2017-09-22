import {EventEmitter} from 'eventemitter3';

export interface ILog {
  date: Date;
  type: string;
  text: string;
  data: any;
}

export interface ITypes{
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

export class DynaLogger extends EventEmitter {
  constructor(settings: ISettings = {}) {
    super();

    this._settings = {
      bufferLimit: 5000,
      consoleLogs: true,
      consoleInfoLogs: true,
      consoleErrorLogs: true,
      consoleWarnLogs: true,
      consoleDebugLogs: true,
      keepLogs: true,
      keepInfoLogs: true,
      keepErrorLogs: true,
      keepWarnLogs: true,
      keepDebugLogs: true,
      ...settings
    };

    if (typeof settings.bufferLimit === 'undefined')
      this.info('DynaLogger', 'bufferLimit not assigned, default is 5000 logs');
  }

  private _settings: ISettings;
  private _logs: ILog[] = [];

  public events: any = {
    log: 'log',
  };

  public types:ITypes={
    log:'log',
    info:'info',
    error:'error',
    warn:'warn',
    debug:'debug',
  };

  public get logs(): ILog[] {
    return [].concat(this._logs);
  }

  public log(section: string, message: string, data: any = null): void {
    this._log('log', section, message, data);
  }

  public info(section: string, message: string, data: any = null): void {
    this._log('info', section, message, data);
  }

  public error(section: string, message: string, data: any = null): void {
    this._log('error', section, message, data);
  }

  public warn(section: string, message: string, data: any = null): void {
    this._log('warn', section, message, data);
  }

  public debug(section: string, message: string, data: any = null): void {
    this._log('debug', section, message, data);
  }

  public clear(type?: string): void {
    if (type)
      this._logs = this.logs.filter((log: ILog) => log.type !== type);
    else
      this._logs = [];
  }

  private _log(type: string, section: string, text_: string = '', data?: any): void {
    const now: Date = new Date();
    const text = this._createMessage(section, type, text_, now);
    const log: ILog = {date: now, type, text, data};
    const consoleParams=[text];

    if (data) consoleParams.push(data);

    if (type == 'log' && this._settings.keepLogs) this._logs.push(log);
    if (type == 'info' && this._settings.keepInfoLogs) this._logs.push(log);
    if (type == 'error' && this._settings.keepErrorLogs) this._logs.push(log);
    if (type == 'warn' && this._settings.keepWarnLogs) this._logs.push(log);
    if (type == 'debug' && this._settings.keepDebugLogs) this._logs.push(log);
    if (type == 'log' && this._settings.consoleLogs) console.log(...consoleParams);
    if (type == 'info' && this._settings.consoleInfoLogs) console.log(...consoleParams);
    if (type == 'error' && this._settings.consoleErrorLogs) console.error(...consoleParams);
    if (type == 'warn' && this._settings.consoleWarnLogs) console.warn(...consoleParams);
    if (type == 'debug' && this._settings.consoleDebugLogs) (console.debug || console.log)(...consoleParams);

    while (this._logs.length > this._settings.bufferLimit) this._logs.shift();

    this.emit(this.events.log, log);
  }

  private _createMessage(section: string, type: string, text: string, date: Date): string {
    return `[${section}] ${date.toLocaleString()} (${type})${text ? ' ' + text : ''}`;
  }
}
