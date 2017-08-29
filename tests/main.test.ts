import {DynaLogger, ILog} from "../src/index";

declare let jasmine: any, describe: any, expect: any, it: any;
if (typeof jasmine !== 'undefined') jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;

const collectedLogs: ILog[] = [];

const logger: DynaLogger = new DynaLogger({bufferLimit: 200});
logger.on('log', (log: ILog) => collectedLogs.push(log));

const monitorConsole: {
  [logType: string]: {message,data}[];
} = {};

debugger;
describe('Dyna logger test', () => {
  it('should log', () => {
    logger.log('test', 'message1', {test:1});
    expect(logger.logs.length).toBe(collectedLogs.length);
  });
  it('should info log', () => {
    logger.info('test', 'message1', {test:1});
    expect(logger.logs.length).toBe(collectedLogs.length);
  });
  it('should error log', () => {
    logger.error('test', 'message1', {test:1});
    expect(logger.logs.length).toBe(collectedLogs.length);
  });
  it('should warn log', () => {
    logger.warn('test', 'message1', {test:1});
    expect(logger.logs.length).toBe(collectedLogs.length);
  });
  it('should debug log', () => {
    logger.debug('test', 'message1', {test:1});
    expect(logger.logs.length).toBe(collectedLogs.length);
  });
});
