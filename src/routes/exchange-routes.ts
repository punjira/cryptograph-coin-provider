import { Router } from 'express';
const router = Router();
import { getCoinsInfoRequest } from '../controllers/coin-info-controller';

router.get('/', getCoinsInfoRequest);

export default router;
