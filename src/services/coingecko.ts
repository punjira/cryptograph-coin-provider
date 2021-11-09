/**
 *
 */

import { CoinGeckoCoin } from '@cryptograph-app/shared-models';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { logger, LOG_LEVELS } from '../../winston';
import {
     coingeckoBaseAddress,
     coingeckoMarkets,
     coingeckoPrefix,
} from '../endpoint';

const fs = require('fs');

const getCoinMarketsPage = (page: number): Promise<CoinGeckoCoin[]> => {
     return new Promise((resolve, reject) => {
          const options: AxiosRequestConfig = {
               url: coingeckoBaseAddress + coingeckoPrefix + coingeckoMarkets,
               method: 'GET',
               params: {
                    vs_currency: 'usd',
                    order: 'market_cap_desc',
                    sparkline: false,
                    per_page: 250,
                    page,
               },
          };
          axios(options)
               .then((data: AxiosResponse<CoinGeckoCoin[]>) => {
                    logger(
                         LOG_LEVELS.INFO,
                         'successfully fetched' +
                              data.data.length +
                              'data from coingecko at page ' +
                              page,
                         'coin-provider/services/coingecko.ts'
                    );
                    resolve(data.data);
               })
               .catch((err: any) => {
                    logger(
                         LOG_LEVELS.ERROR,
                         'failed at fetching data from coingecko Error:' + err,
                         'coin-provider/services/coingecko.ts'
                    );
                    reject(err);
               });
     });
};

export const getCoinMarkets = (): Promise<CoinGeckoCoin[]> => {
     return new Promise(async (resolve, reject) => {
          let res: CoinGeckoCoin[] = [];
          let page: number | undefined = 1;
          while (page) {
               try {
                    const page_response = await getCoinMarketsPage(page);
                    res = [...res, ...page_response];
                    page = page + 1;
                    if (!page_response.length) {
                         page = undefined;
                         return resolve(res);
                    }
               } catch (err) {
                    reject(err);
               }
          }
     });
};
