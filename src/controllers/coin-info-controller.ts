import { Coin } from '@cryptograph-app/shared-models';
import { CoinModel } from '../models/coin-info';

export function getCoinInfo(keyword: string): Coin | null {
     return null;
}

export function getCoinsInfoRequest(req, res) {
     CoinModel.find({}, function (err, result) {
          if (err) {
               return res.status(500).json({
                    message: 'something went wrong',
               });
          }
          return res.status(200).json({ data: result });
     });
}

export function getCoinInfos(): Promise<Coin[]> {
     return new Promise((resolve, reject) => {
          CoinModel.find({}, function (err, result) {
               if (err) {
                    return reject(err);
               }
               return resolve(result);
          });
     });
}

export function createCoinInfo(data: Coin): Promise<Coin> {
     return new Promise((resolve, reject) => {});
}

export function insetManyCoinInfos(data: Coin[]): Promise<void> {
     return new Promise((resolve, reject) => {
          CoinModel.insertMany(
               data,
               { ordered: false },
               function (err, result) {
                    if (err) {
                         return reject(err);
                    }
                    return resolve();
               }
          );
     });
}
