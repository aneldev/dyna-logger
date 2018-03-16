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
	text: string; // stringified parameters, used in logs property
	data: any;
}

export enum ELogType {
	LOG = 'LOG',
	INFO = 'INFO',
	ERROR = 'ERROR',
	WARN = 'WARN',
	DEBUG = 'DEBUG',
}

export interface IEvents {
	log: string;
}

export class DynaLogger {
	constructor(config: IConfig = {}) {
		this.setConfig(config);

		if (this._config.replaceGlobalLogMethods) {
			this._replaceGlobalLog();
		}
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
			consoleLogType: true,
			consoleTimestamp: true,
			keepLogs: true,
			keepInfoLogs: true,
			keepErrorLogs: true,
			keepWarnLogs: true,
			keepDebugLogs: true,
			replaceGlobalLogMethods: false,
			onLog: (log: ILog) => undefined,
			...config,
		};
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

	private _replaceGlobalLog(): void {
		global.console.log = (...params: any[]): void => this._log(ELogType.LOG, null, params);
		global.console.info = (...params: any[]): void => this._log(ELogType.INFO, null, params);
		global.console.error = (...params: any[]): void => this._log(ELogType.ERROR, null, params);
		global.console.warn = (...params: any[]): void => this._log(ELogType.WARN, null, params);
		global.console.debug = (...params: any[]): void => this._log(ELogType.DEBUG, null, params);
	}

	private _restoreGlobalLog(): void {
		global.console = {
			...global.console,
			...this._realConsole,
		}
	}

	public get logs(): ILog[] {
		return [].concat(this._logs);
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

	private _log(type: ELogType, section: string, text_: string | any[] = '', data?: any): void {
		let consoleOutput: any[] = [];
		const now: Date = new Date();
		let userText: any[];
		if (Array.isArray(text_)) userText = text_; else userText = [text_];
		if (this._config.consoleLogType) consoleOutput.push(type);
		if (section) consoleOutput.push(section);
		if (this._config.consoleTimestamp) consoleOutput.push(now.toLocaleString());
		consoleOutput = consoleOutput.concat(userText);
		const log: ILog = {date: now, type, text: this._stringifyConsoleParams(consoleOutput), data: userText};

		if (data) consoleOutput.push(data);

		// add to _logs
		if (type == ELogType.LOG && this._config.keepLogs) this._logs.push(log);
		if (type == ELogType.INFO && this._config.keepInfoLogs) this._logs.push(log);
		if (type == ELogType.ERROR && this._config.keepErrorLogs) this._logs.push(log);
		if (type == ELogType.WARN && this._config.keepWarnLogs) this._logs.push(log);
		if (type == ELogType.DEBUG && this._config.keepDebugLogs) this._logs.push(log);

		// console it
		if (type == ELogType.LOG && this._config.consoleLogs) this._realConsole.log(...consoleOutput);
		if (type == ELogType.INFO && this._config.consoleInfoLogs) this._realConsole.info(...consoleOutput);
		if (type == ELogType.ERROR && this._config.consoleErrorLogs) this._realConsole.error(...consoleOutput);
		if (type == ELogType.WARN && this._config.consoleWarnLogs) this._realConsole.warn(...consoleOutput);
		if (type == ELogType.DEBUG && this._config.consoleDebugLogs) (this._realConsole.debug)(...consoleOutput);

		// keep the bufferLimit
		if (this._config.bufferLimit > -1) {
			// clean up
			while (this._logs.length > this._config.bufferLimit) this._logs.shift();
			// set the older with a proper message
			if (this._config.bufferLimit > 0 && this._logs.length === this._config.bufferLimit) {
				this._logs[0] = {
					date: this._logs[0].date,
					type: ELogType.WARN,
					text: `--- previous logs deleted due to bufferLimit: ${this._config.bufferLimit}`,
					data: {config: this._config}
				} as ILog;
			}
		}

		this._config.onLog(log);
	}

	private _stringifyConsoleParams(params: any[]): string {
		return params.reduce((acc: string, value: any) => {
			if (acc.length) acc += " ";
			if (typeof value === "string") acc += value; else acc += String(value);
			return acc;
		}, '');
	}

}
