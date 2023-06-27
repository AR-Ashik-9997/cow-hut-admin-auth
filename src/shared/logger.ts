import path from 'path';
import { createLogger, format } from 'winston';
const { combine, timestamp, printf } = format;
import DailyRotateFile from 'winston-daily-rotate-file';

const myFormat = printf(({ level, message, timestamp }) => {
  const date = new Date(timestamp);
  const readableDate = date.toLocaleString('en-UK', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const readableTime = date.toLocaleString('en-UK', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
  return `${readableDate},${readableTime} ${level}: ${message}`;
});
const logger = createLogger({
  level: 'info',
  format: combine(timestamp(), myFormat),
  transports: [
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'successes',
        '%DATE%-succes.log'
      ),
      datePattern: 'DD-MM-YYYY-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
});
const errorlogger = createLogger({
  level: 'error',
  format: combine(timestamp(), myFormat),
  transports: [
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'errors',
        '%DATE%-error.log'
      ),
      datePattern: 'DD-MM-YYYY-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
});

export { logger, errorlogger };
