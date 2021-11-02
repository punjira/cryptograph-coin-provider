import { ExchangeModel } from '../models/exchange-model';
import { Exchange } from '@cryptograph-app/shared-models';

export function getExchanges(): Promise<Exchange[]> {
     return new Promise((resolve, reject) => {
          ExchangeModel.find({}, (err: any, result) => {
               if (err) {
                    return reject(err);
               }
               return resolve(result);
          });
     });
}
