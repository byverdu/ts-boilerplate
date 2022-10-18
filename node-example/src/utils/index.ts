type Logger = 'error' | 'warn' | 'log';

const logger = (loggerType: Logger, msg: string) => {
  console[loggerType](msg);
};

export { logger };
