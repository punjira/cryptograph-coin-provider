import { InternalServerError } from '@cryptograph-app/error-handlers';
import { CoinModel } from '../models/coin-info';

export function simpleSearch(req, res, next) {
     const keyword = req.params.keyword;
     const reg = new RegExp(keyword);
     CoinModel.find({ ticker: { $regex: reg, $options: 'i' } })
          .limit(5)
          .exec((err, result) => {
               if (err) {
                    throw new InternalServerError();
               }
               return res.status(200).json({
                    data: result,
               });
          });
}
