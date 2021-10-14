import { DatabaseConnectionError } from '@cryptograph-app/error-handlers';
import mongoose from 'mongoose';
import { logger, LOG_LEVELS } from '../../winston';

mongoose.connect('mongodb://coin-provider-mongo-srv:27017/coin');

const db = mongoose.connection;

db.once('open', () => {
     console.log('connection to mongo db created');
});

db.on('error', (err) => {
     logger(
          LOG_LEVELS.ERROR,
          'error connecting to database , error description: ' + err,
          'database/mongo.ts'
     );
     throw new DatabaseConnectionError();
});
