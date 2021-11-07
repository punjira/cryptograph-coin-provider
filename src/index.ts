import { createNatsSubscriptions } from './nats/subscription';
import { MongoConnect } from './database/mongo';

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();

app.use(cors());
app.use(bodyParser({ extended: true }));

MongoConnect(() => {
     createNatsSubscriptions();
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
