import express from 'express';
const app = express();
import cors from 'cors';
import bodyParser from 'body-parser';
app.use(cors());
app.use(bodyParser({ extended: true }));
require('./database/mongo');
import { natsClient } from './nats/nats-helper';
natsClient
     .getInstance()
     .getClient()
     .on('connect', () => {
          // require('./lib/binance-exchange');
     });

//----------routes------------
import ExchangeRouter from './routes/exchange-routes';
import FeaturedRouter from './routes/featured-routes';
import SearchRouter from './routes/search-routes';

app.use('/exchange', ExchangeRouter);
app.use('/featured', FeaturedRouter);
app.use('/search', SearchRouter);

app.listen(process.env.PORT, () => {
     console.log('coin provider service is up on port ', process.env.PORT);
});
