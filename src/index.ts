import {EventEmitter} from 'eventemitter3';

export interface ILog {
  date: Date;
  type: string;
  text: string; // stringified parameters, used in logs property
	raw: any[];   // contains the paramters as received
  data: any;
}

export interface ITypes {
  log: string;
  info: string;
  error: string;
  warn: string;
  debug: string;
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

export class DynaLogger extends EventEmitter {
  constructor(config: IConfig = {}) {
    super();
    this.setConfig(config);
  }

  private _config: IConfig;
  private _logs: ILog[] = [];

  public setConfig(config: IConfig = {}): void {
    this._config = {
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
	    replaceGlobalLogMethods: false,
      ...config
    };

	  if (this._config.replaceGlobalLogMethods) {
		  this._replaceGlobalLog();
	  }
  }

	private _realConsole: Console = {...global.console};

	public destroy(): void {
		if (this._config.replaceGlobalLogMethods) {
			this._restoreGlobalLog();
		}
	}

  public events: IEvents = {
    log: 'log',
  };

  public types: ITypes = {
    log: 'log',
    info: 'info',
    error: 'error',
    warn: 'warn',
    debug: 'debug',
  };

	private _replaceGlobalLog(): void {
		global.console.log = (...params: any[]): void => this._log('log', 'global', params);
		global.console.info = (...params: any[]): void => this._log('info', 'global', params);
		global.console.error = (...params: any[]): void => this._log('error', 'global', params);
		global.console.warn = (...params: any[]): void => this._log('warn', 'global', params);
		global.console.debug = (...params: any[]): void => this._log('debug', 'global', params);
	}

	private _restoreGlobalLog(): void {
		global.console = {
			...global.console,
			...this._realConsole,
		}
	}

	private _stringifyConsoleParams(params: any[]): string {
		return params.reduce((acc: string, value: any) => {
			if (acc.length) acc += " ";
			if (typeof value === "string") acc += value; else acc += String(value);
			return acc;
		}, '');
	}

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

	private _log(type: string, section: string, text_: string | any[] = '', data?: any): void {
		let consoleOutput: any[] = [];
		const now: Date = new Date();
		let userText: any[];
		if (Array.isArray(text_)) userText = text_; else userText = [text_];
		consoleOutput.push(section);
		consoleOutput.push(now.toLocaleString());
		consoleOutput = consoleOutput.concat(userText);
		const log: ILog = {date: now, type, text: this._stringifyConsoleParams(consoleOutput), data, raw: userText};

		if (data) consoleOutput.push(data);

    // add to _logs
    if (type == 'log' && this._config.keepLogs) this._logs.push(log);
    if (type == 'info' && this._config.keepInfoLogs) this._logs.push(log);
    if (type == 'error' && this._config.keepErrorLogs) this._logs.push(log);
    if (type == 'warn' && this._config.keepWarnLogs) this._logs.push(log);
    if (type == 'debug' && this._config.keepDebugLogs) this._logs.push(log);

    // console it
		if (type == 'log' && this._config.consoleLogs) this._realConsole.log(...consoleOutput);
		if (type == 'info' && this._config.consoleInfoLogs) this._realConsole.info(...consoleOutput);
		if (type == 'error' && this._config.consoleErrorLogs) this._realConsole.error(...consoleOutput);
		if (type == 'warn' && this._config.consoleWarnLogs) this._realConsole.warn(...consoleOutput);
		if (type == 'debug' && this._config.consoleDebugLogs) (this._realConsole.debug)(...consoleOutput);

    // keep the bufferLimit
    if (this._config.bufferLimit > -1) {
      // clean up
      while (this._logs.length > this._config.bufferLimit) this._logs.shift();
      // set the older with a proper message
      if (this._config.bufferLimit > 0 && this._logs.length === this._config.bufferLimit) {
        this._logs[0] = {
          date: this._logs[0].date,
          type: this.types.warn,
          text: `--- previous logs deleted due to bufferLimit: ${this._config.bufferLimit}`,
          data: {config: this._config}
        } as ILog;
      }
    }

    this.emit(this.events.log, log);
  }
}
