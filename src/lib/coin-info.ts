/**
 * unlike binance-exchange coin-information is not automatically ran.
 * this is because coin information is provided only for the exchanges that binance \
 * offers. instead it exports a function that ./binance-exchange.ts can call \
 * after setting all exchanges. this also makes sure that exchanges are set \
 * before running coin information.
 *
 * also notice that the information fetched here do not find their way through nats \
 * network
 *
 */

import { getCoinMarkets } from '../services/coingecko';
import {
     createCoinDocumentFromCoingeckoResponse,
     Exchange,
} from '@cryptograph-app/shared-models';
import { insetManyCoinInfos } from '../controllers/coin-info-controller';
import {
     filterCoinInfoOnExchange,
     filterCoinDuplicated,
} from '../helpers/coin-info-helpers';
import { getCoinInfos } from '../controllers/coin-info-controller';
import { logger, LOG_LEVELS } from '../../winston';

const logPath = 'coin-provider/lib/coin-info.ts';

export default function getCoinInformation(
     newExchanges: Exchange[]
): Promise<boolean> {
     logger(LOG_LEVELS.INFO, 'starting coingecko information fetch', logPath);
     if (!newExchanges.length) {
          logger(
               LOG_LEVELS.INFO,
               'no new exchange is added, skipping the download process',
               logPath
          );
          return;
     }
     return new Promise((resolve, reject) => {
          getCoinMarkets()
               .then(async (data) => {
                    const Documents =
                         createCoinDocumentFromCoingeckoResponse(data);
                    const CoinDocuments = await getCoinInfos();
                    const ValidDocuments = filterCoinInfoOnExchange(
                         Documents,
                         newExchanges
                    );
                    const NewDocuments = filterCoinDuplicated(
                         CoinDocuments,
                         ValidDocuments
                    );
                    console.log(
                         'inserting ' +
                              NewDocuments.length +
                              ' new info documents'
                    );
                    return insetManyCoinInfos(NewDocuments);
               })
               .then(() => {
                    logger(
                         LOG_LEVELS.INFO,
                         'successfully updated coin-info database',
                         logPath
                    );
                    resolve(true);
               })
               .catch((err) => {
                    reject(err);
                    logger(
                         LOG_LEVELS.ERROR,
                         'error while updating coin info database Error: ' +
                              err,
                         logPath
                    );
               });
     });
}
