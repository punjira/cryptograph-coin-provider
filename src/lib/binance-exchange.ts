/**
 * create storable binance exchange information
 *
 * fetch binance available exchanges
 * filter usdt based pairs
 * update database
 * fire nats event
 */

import { getExchangeInfo } from '../services/binance';
import { filterUSDTQuotes, findNewDocuments } from '../helpers/exchange-filter';
import { logger, LOG_LEVELS } from '../../winston';

import {
     createExchangeDocumentFromStringArray,
     ExchangeModel,
} from '../models/exchange-model';
import { getExchanges } from '../controllers/exchange-controller';
import getCoinInformation from './coin-info';

export default (async function () {
     logger(
          LOG_LEVELS.INFO,
          'starting binance exchange update process',
          'coin-provider/lib/binance-exchange.ts'
     );
     getExchangeInfo()
          .then(async (data) => {
               console.log(
                    'successfully fetched ',
                    data.length,
                    ' documents from binance'
               );
               const usdtBased = filterUSDTQuotes(data);
               const Documents =
                    createExchangeDocumentFromStringArray(usdtBased);
               const inDatabaseQuotes = await getExchanges();
               const newDocuments = findNewDocuments(
                    inDatabaseQuotes,
                    Documents
               );
               console.log(newDocuments.length, ' new documents to append');
               return ExchangeModel.insertMany(newDocuments, {
                    ordered: false,
               });
          })
          .then((docs) => {
               console.log(
                    'binance exchanges successfully updated, running coingecko updates'
               );
               // get coin info
               return getCoinInformation(docs);
          })
          .then(() => {
               // publish new documents to nats service
               logger(
                    LOG_LEVELS.INFO,
                    'updated binance exchanges',
                    'coin-provider/lib/binance-exchange.ts'
               );
          })
          .catch((err) => {
               logger(
                    LOG_LEVELS.ERROR,
                    'update binance exchange failed' + err,
                    'coin-provider/lib/binance-exchange.ts'
               );
               // throw new InternalServerError();
          });
})();
