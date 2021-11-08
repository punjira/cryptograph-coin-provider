import mongoose from 'mongoose';
import { logger, LOG_LEVELS } from '../../winston';

export const MongoConnect = function (callback) {
     mongoose.connect(`${process.env.MONGO_URL}`, {
          connectTimeoutMS: 30000,
          socketTimeoutMS: 30000,
          keepAlive: true,
          dbName: 'coin',
     });
     const db = mongoose.connection;
     db.once('open', () => {
          console.log('connection to mongo db created');
          callback();
     });
     db.on('error', (err) => {
          logger(
               LOG_LEVELS.ERROR,
               'error connecting to database , error description: ' + err,
               'database/mongo.ts'
          );
     });
     db.on('disconnected', () => {
          console.log('mongo connection disconnected, The thing: ');
          mongoose.connect(`${process.env.MONGO_URL}`, {
               connectTimeoutMS: 30000,
               socketTimeoutMS: 30000,
               keepAlive: true,
               dbName: 'coin',
          });
     });
     db.on('close', () => {});
};
