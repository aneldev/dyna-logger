import {DynaLogger, ELogType, ILog} from "../../src";

declare let jasmine: any, describe: any, expect: any, it: any;
if (typeof jasmine !== 'undefined') jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;

describe('Dyna logger i/o test', () => {
  const collectedLogs: ILog[] = [];

  const logger: DynaLogger = new DynaLogger({
    bufferLimit: 200,
    onLog:(log: ILog) => collectedLogs.push(log),
  });

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

describe('Dyna logger, clear method test', () => {
  const logger: DynaLogger = new DynaLogger({bufferLimit: 200});

  it('should add', () => {
    logger.log('test', 'message1', {test: 1});
    logger.info('test', 'message1', {test: 1});
    logger.error('test', 'message1', {test: 1});
    logger.warn('test', 'message1', {test: 1});
    logger.debug('test', 'message1', {test: 1});
    expect(logger.logs.length).toBe(5);
  });
  it('should clear logs only', () => {
    logger.clear(ELogType.LOG);
    expect(logger.logs.length).toBe(4);
  });
  it('should clear infos only', () => {
    logger.clear(ELogType.INFO);
    expect(logger.logs.length).toBe(3);
  });
  it('should clear errors only', () => {
    logger.clear(ELogType.ERROR);
    expect(logger.logs.length).toBe(2);
  });
  it('should clear warns only', () => {
    logger.clear(ELogType.WARN);
    expect(logger.logs.length).toBe(1);
  });
  it('should clear debugs only', () => {
    logger.log('test', 'message1', {test: 1});
    logger.clear(ELogType.DEBUG);
    expect(logger.logs.length).toBe(1);
  });
});

describe('Dyna logger, replace native console', () => {
	let logger: DynaLogger;
	let realConsoleLogMethod: any;

	it('save the console method reference', () => {
		realConsoleLogMethod = console.log;
	});

	it('should load the logger', () => {
		logger = new DynaLogger({
			bufferLimit: -1,
			replaceGlobalLogMethods: true,
		});
		expect(!!logger).toBe(true);
	});

	it('should global console different',()=>{
		expect(realConsoleLogMethod).not.toBe(console.log);
	});

	it('should destroy logger',()=>{
		logger.destroy();
	});

	it('should restore the global console method',()=>{
		expect(realConsoleLogMethod).toBe(console.log);
	});
});
