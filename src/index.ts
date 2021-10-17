require('./database/mongo');
//-------initial population---------
require('./lib/binance-exchange');
import express from 'express';
const app = express();

//----------routes------------
import ExchangeRouter from './routes/exchange-routes';

app.use('/exchange', ExchangeRouter);

app.listen(process.env.PORT, () => {
     console.log('coin provider service is up on port ', process.env.PORT);
});
