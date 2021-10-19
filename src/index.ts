import express from 'express';
const app = express();
require('./database/mongo');
import { natsClient } from './nats/nats-helper';
natsClient
     .getInstance()
     .getClient()
     .on('connect', () => {
          require('./lib/binance-exchange');
     });

//----------routes------------
import ExchangeRouter from './routes/exchange-routes';

app.use('/exchange', ExchangeRouter);

app.listen(process.env.PORT, () => {
     console.log('coin provider service is up on port ', process.env.PORT);
});
