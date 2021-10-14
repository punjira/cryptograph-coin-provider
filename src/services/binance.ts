/**
 * binance related services
 */

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { logger, LOG_LEVELS } from '../../winston';
import {
     binanceBaseAddress,
     binanceExchangeInfo,
     binancePrefix,
} from '../endpoint';

interface BinanceExchangeResponse {
     symbols: {
          symbol: string;
     }[];
}

export const getExchangeInfo = (): Promise<string[]> => {
     return new Promise((resolve, reject) => {
          const options: AxiosRequestConfig = {
               method: 'GET',
               url: binanceBaseAddress + binancePrefix + binanceExchangeInfo,
          };
          axios(options)
               .then((data: AxiosResponse<BinanceExchangeResponse>) => {
                    resolve(data.data.symbols.map((el) => el.symbol));
               })
               .catch((err) => {
                    logger(
                         LOG_LEVELS.ERROR,
                         'error getting exchange information from binance ' +
                              err,
                         'coin-provider/services/binance.ts'
                    );
                    reject(err?.response?.data || 'request failed');
               });
     });
};
