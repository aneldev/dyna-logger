# About 

Tiny logger with limited buffer for universal environments.

Written in Typescript, runs everywhere.

# Usage

## Collected the logs in this array, listening on 'log' event

``` 
const collectedLogs = [];

// create the logger with limit 200 logs
const logger = new DynaLogger({
	bufferLimit: 200,
	(log: ILog) => collectedLogs.push(log), 	// collect all detected logs
});

logger.info('Login Page', 'Success login', {user: userInfo});

logger.error('Login Page', 'login failed', {user: userInfo, error: errorObject});

console.log(logger.logs.length); 	// consoles 2

``` 

## Collected the logs of whole process in an array, listening on 'log' event

``` 
const collectedLogs = [];

// create the logger with limit 200 logs
const logger = new DynaLogger({
	bufferLimit: 200,
	replaceGlobalLogMethods: true,				// monitors all console log methods
	(log: ILog) => collectedLogs.push(log), 	// collect all detected logs
});

console.info('Login Page', 'Success login', {user: userInfo});

console.error('Login Page', 'login failed', {user: userInfo, error: errorObject});

console.log(logger.logs.length); 	// consoles 2

``` 

# Configuration 

- bufferLimit: number;					// (default: 5000) -1 = unlimited, 0 = no buffer, >0 size of buffer
- consoleLogs: boolean;
- consoleInfoLogs: boolean;
- consoleErrorLogs: boolean;
- consoleWarnLogs: boolean;
- consoleDebugLogs: boolean;
- keepLogs: boolean;
- keepInfoLogs: boolean;
- keepErrorLogs: boolean;
- keepWarnLogs: boolean;
- keepDebugLogs: boolean;
- replaceGlobalLogMethods: boolean; 	// call .destroy(); to restore the real console methods
  
# Methods

## log(section: string, message: string, data: any = null): void

Consoles a log.

## info(section: string, message: string, data: any = null): void

Consoles an info.

## error(section: string, message: string, data: any = null): void

Consoles an error.

## warn(section: string, message: string, data: any = null): void

Consoles a warn.

## debug(section: string, message: string, data: any = null): void

Consoles a debug.

## destroy(): void

Shut's down the logger.

If `replaceGlobalLogMethods` is set to true, call `destroy()` is restoring the original methods.

# Properties

## logs: ILog[]

# Events

## log

Returns a ILog

# Interfaces

## ILog
``` 
   {
     date: Date;
     type: string;
     text: string;  // include the section and date	
     raw: string;	// contains only the source text
     data: any;
   }
``` 

# Replace Global Log Methods `replaceGlobalLogMethods`

This feature replaces the global log methods and captures all the consoles. 

You can get them by the `onLog` config callback and send them or store them. 

# Change log

This project is compatible with Semver.

## v1

- First version

## v2

- Typings fix in package.json
- Rename of IConfiguration to ISettings 

## v3

- ELogTypes enum
- Remove the event emitter, use the `onLog` config callback
- New feature: consoles all params as it is and not as string, like the native log methods
- New feature: `replaceGlobalLogMethods`, monitors all the logs of the procees.
