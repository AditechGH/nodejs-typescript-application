import { format, loggers, transports } from 'winston';
import winstonDailyRotateFile from 'winston-daily-rotate-file';
import Config from './app.config';

const constants = Config.constants;

const logger = loggers.add('customLogger', {
  level: constants.ENV === 'production' ? 'info' : 'debug',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.metadata({ fillExcept: ['timestamp', 'message', 'level', 'label'] })
  ),
  transports: [
    new transports.Console({
      level: 'debug',
      format: format.combine(
        format.colorize(),
        format.printf(
          (info) => `${info.timestamp} ${info.level}: ${info.message}`
        )
      ),
      silent: constants.ENV === 'test',
    }),
    new winstonDailyRotateFile({
      filename: './logs/custom-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      level: 'info',
      handleExceptions: true,
      format: format.combine(format.json()),
    }),
  ],
  exitOnError: false,
});

export const stream = {
  write: (message: any) => {
    logger.info(message);
  },
};

export default logger;
