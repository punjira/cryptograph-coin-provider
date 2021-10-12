import { Coin } from '../models/coin-info-model';
import { CoinInfoAttr } from '../models/coin-info-model';

export function getCoinInfos(): Promise<CoinInfoAttr[]> {
     return new Promise((resolve, reject) => {
          Coin.find({}, (err: any, result) => {
               if (err) {
                    return reject(err);
               }
               return resolve(result);
          });
     });
}
