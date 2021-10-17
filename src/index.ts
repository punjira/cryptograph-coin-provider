require('./database/mongo');
//-------initial population---------
require('./lib/binance-exchange');
import express from 'express';
const app = express();

//----------routes------------
import ExchangeRouter from './routes/exchange-routes';

app.use(function (req, res, next) {
     console.log('request');
     next();
});

app.use('/exchange', ExchangeRouter);

app.listen(3000, () => {
     console.log('coin provider service is up on port 3000');
});
