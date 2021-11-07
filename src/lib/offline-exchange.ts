import { logger, LOG_LEVELS } from '../../winston';
import fixedExchanges from '../helpers/whitelist';
import {
     createExchangeDocumentFromStringArray,
     ExchangeModel,
} from '../models/exchange-model';
import { natsClient } from '../nats/nats-helper';
import { EXCHANGE_LIST_REPLY } from '../nats/subscription';
import getCoinInformation from './coin-info';

export default (async function () {
     logger(
          LOG_LEVELS.INFO,
          'reading exchanges from offline json file and populating database'
     );
     const Documents = createExchangeDocumentFromStringArray(fixedExchanges());
     ExchangeModel.insertMany(Documents, { ordered: false })
          .then((data) => {
               /**
                * notify others
                */
               natsClient
                    .getInstance()
                    .getClient()
                    .publish(
                         EXCHANGE_LIST_REPLY,
                         JSON.stringify(
                              fixedExchanges().map((el) => ({
                                   ticker: el,
                              }))
                         )
                    );
               if (data.length) {
                    return getCoinInformation(data);
               }
          })
          .catch((err) => {});
})();
