import { Router } from 'express';
const router = Router();

import { getTopTen } from '../controllers/featured-coins-controller';

/**
 * @api {get} /featured/topten get top ten most famous coins
 * @apiName GetTopTen
 * @apiGroup CoinInfo
 *
 * @apiSuccess {object[]} coin     List of coins
 * @apiSuccess {string}   coin.ticker ticker name ex: btcusdt
 */
router.get('/topten', getTopTen);

export default router;
