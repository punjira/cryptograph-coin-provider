import { Router } from 'express';
const router = Router();

import { simpleSearch } from '../controllers/search-controller';

/**
 * @api {get} /search search coins by keyword. returns 5 top matching results
 * @apiName Search
 * @apiGroup CoinInfo
 *
 * @apiSuccess {object[]} coin     List of coins
 * @apiSuccess {string}   coin.ticker ticker name ex: btcusdt
 */
router.get('/', simpleSearch);

export default router;
