import {EventEmitter} from 'eventemitter3';

export interface ILog {
  date: Date;
  type: string;
  text: string;
  data: any;
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
  public _journal: ILog[] = [];

  public events: any = {
    log: 'log',
  };

  public get logs(): ILog[] {
    return [].concat(this._journal);
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

  public clearLogs(): void {
    this._journal = [];
  }

  private _log(type: string, section: string, text_: string = '', data: any = null): void {
    const now: Date = new Date();
    const text = this._createMessage(section, type, text_, now);
    const log: ILog = {date: now, type, text, data};

    if (type == 'log' && this._settings.keepLogs) this._journal.push(log);
    if (type == 'info' && this._settings.keepInfoLogs) this._journal.push(log);
    if (type == 'error' && this._settings.keepErrorLogs) this._journal.push(log);
    if (type == 'warn' && this._settings.keepWarnLogs) this._journal.push(log);
    if (type == 'debug' && this._settings.keepDebugLogs) this._journal.push(log);
    if (type == 'log' && this._settings.consoleLogs) console.log(text, data);
    if (type == 'info' && this._settings.consoleInfoLogs) console.log(text, data);
    if (type == 'error' && this._settings.consoleErrorLogs) console.error(text, data);
    if (type == 'warn' && this._settings.consoleWarnLogs) console.warn(text, data);
    if (type == 'debug' && this._settings.consoleDebugLogs) (console.debug || console.log)(text, data);

    while (this._journal.length > this._settings.bufferLimit) this._journal.shift();

    this.emit(this.events.log, log);
  }

  private _createMessage(section: string, type: string, text: string, date: Date): string {
    return `[${section}] ${date.toLocaleString()} (${type})${text ? ' ' + text : ''}`;
  }
}
