# About 

Tiny logger with limited buffer for universal environments.

Written in Typascript, runs everywhere.

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

# Settings 

- bufferLimit: number;			// (default: 5000) -1 = unlimited, 0 = no buffer, >0 size of buffer
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
  
# Methods

## log(section: string, message: string, data: any = null): void
## info(section: string, message: string, data: any = null): void
## error(section: string, message: string, data: any = null): void
## warn(section: string, message: string, data: any = null): void
## debug(section: string, message: string, data: any = null): void

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
