import { Exchange } from '@cryptograph-app/shared-models';
import { logger, LOG_LEVELS } from '../../winston';
import { getExchanges } from '../controllers/exchange-controller';
import { natsClient } from './nats-helper';

export const EXCHANGE_LIST_REQUEST = 'EXCHANGE_LIST_REQUEST';
export const EXCHANGE_LIST_REPLY = 'EXCHANGE_LIST_REPLY';

export function createNatsSubscriptions() {
     natsClient
          .getInstance()
          .getClient()
          .on('connect', () => {
               require('../lib/binance-exchange');
               const exchange_request_subscription = natsClient
                    .getInstance()
                    .getClient()
                    .subscribe(EXCHANGE_LIST_REQUEST);
               exchange_request_subscription.on('message', () => {
                    getExchanges()
                         .then((data: Exchange[]) => {
                              natsClient
                                   .getInstance()
                                   .getClient()
                                   .publish(
                                        EXCHANGE_LIST_REPLY,
                                        JSON.stringify(data)
                                   );
                         })
                         .catch((err: any) => {
                              logger(
                                   LOG_LEVELS.ERROR,
                                   'error while reading exchange list. Error: ' +
                                        err,
                                   'coin-provider/nats/subscription.ts'
                              );
                         });
               });
          });
}
