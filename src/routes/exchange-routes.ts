import { Router } from 'express';
const router = Router();
import { getCoinsInfoRequest } from '../controllers/coin-info-controller';

/**
 * @api {get} /exchange Get all available exchanges
 * @apiName GetExchanges
 * @apiGroup CoinInfo
 *
 * @apiSuccess  {Object[]} exchange         List of exchanges
 * @apiSuccess  {String}   exchange.ticker  ticker ex: btcusdt
 */
router.get('/', getCoinsInfoRequest);

export default router;
