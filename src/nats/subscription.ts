import { Coin, Exchange } from '@cryptograph-app/shared-models';
import { logger, LOG_LEVELS } from '../../winston';
import { getCoinInfos } from '../controllers/coin-info-controller';
import { getExchanges } from '../controllers/exchange-controller';
import { natsClient } from './nats-helper';

export const EXCHANGE_LIST_REQUEST = 'EXCHANGE_LIST_REQUEST';
export const EXCHANGE_LIST_REPLY = 'EXCHANGE_LIST_REPLY';
export const COIN_INFO_LIST_REQUEST = 'COIN_INFO_LIST_REQUEST';
export const COIN_INFO_LIST_REPLY = 'COIN_INFO_LIST_REPLY';

export function createNatsSubscriptions() {
     const client = natsClient.getInstance().getClient();
     client.on('connect', () => {
          require('../lib/offline-exchange');
          const exchange_request_subscription = client.subscribe(
               EXCHANGE_LIST_REQUEST
          );
          exchange_request_subscription.on('message', () => {
               getExchanges()
                    .then((data: Exchange[]) => {
                         client.publish(
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
          const info_request_subscription = client.subscribe(
               COIN_INFO_LIST_REQUEST
          );
          info_request_subscription.on('message', () => {
               getCoinInfos()
                    .then((data: Coin[]) => {
                         client.publish(
                              COIN_INFO_LIST_REPLY,
                              JSON.stringify(data)
                         );
                    })
                    .catch((err: any) => {
                         logger(
                              LOG_LEVELS.ERROR,
                              'error while reading coin info list, Error: ' +
                                   err,
                              'coin-provider/nats/subscription.ts'
                         );
                    });
          });
     });
}
