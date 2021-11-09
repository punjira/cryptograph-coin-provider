import { InternalServerError } from '@cryptograph-app/error-handlers';
import { CoinModel } from '../models/coin-info';

export function getTopTen(req, res, next) {
     CoinModel.find({})
          .limit(10)
          .exec(function (err, result) {
               if (err) {
                    throw new InternalServerError();
               }
               return res.status(200).json({
                    data: result,
               });
          });
}
