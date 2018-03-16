# About 

Tiny logger with limited buffer for universal environments.

Written in Typescript, runs everywhere.

# Usage

``` 
// collected the logs in this array, listening on 'log' event
const collectedLogs = [];

// create the logger with limit 200 logs
const logger = new DynaLogger({bufferLimit: 200});

// add the event listener
logger.on('log', (log: ILog) => collectedLogs.push(log));

logger.info('Login Page', 'Success login', {user: userInfo});

logger.error('Login Page', 'login failed', {user: userInfo, error: errorObject});

console.log(logger.logs.length); 	// consoles 1

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
# Change log

This project is compatible with Semver.

## v1

- First version

## v2

- Typings fix in package.json
- Rename of IConfiguration to ISettings 
