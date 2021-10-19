/**
 * nats client api
 */

import nats from 'node-nats-streaming';
import { randomBytes } from 'crypto';

export const EXCHANGE_UPDATE_EVENT = 'EXCHANGE_UPDATE';

export const natsClient = (function () {
     class NatsClient {
          stan: nats.Stan;
          constructor() {
               this.stan = nats.connect(
                    'cryptograph',
                    randomBytes(4).toString('hex'),
                    {
                         url: process.env.NATS_URL,
                    }
               );
          }
          getClient() {
               return this.stan;
          }
          publishMessage(topic, message) {
               this.stan.publish(topic, JSON.stringify(message), () => {
                    // do logging
               });
          }
     }
     let instance: NatsClient;
     return {
          getInstance: () => {
               if (!instance) {
                    instance = new NatsClient();
               }
               return instance;
          },
     };
})();
