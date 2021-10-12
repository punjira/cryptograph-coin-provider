import winston from 'winston';
import path from 'path';

export enum LOG_LEVELS {
     ERROR = 'error',
     DEBUG = 'debug',
     INFO = 'info',
}

const customLogger = winston.createLogger({
     level: 'info',
     format: winston.format.json(),
     defaultMeta: { service: 'user-service' },
     transports: [
          new winston.transports.File({
               filename: path.join(__dirname, '../logs/info.log'),
               level: 'info',
          }),
          new winston.transports.File({
               filename: path.join(__dirname, '../logs/debug.log'),
               level: 'debug',
          }),
          new winston.transports.File({
               filename: path.join(__dirname, '../logs/error.log'),
               level: 'error',
          }),
          new winston.transports.File({
               filename: path.join(__dirname, '../logs/combined.log'),
          }),
     ],
});

if (process.env.NODE_ENV !== 'production') {
     customLogger.add(
          new winston.transports.Console({
               format: winston.format.simple(),
          })
     );
}

export const logger = (level: LOG_LEVELS, message: string, file?: string) => {
     const customizedMessage = `NEW LOG MESSAGE\t${Date()}\tfile: ${
          file ? file : 'undefined'
     }\tmessage: ${message}`;
     customLogger.log({
          level,
          message: customizedMessage,
     });
};
