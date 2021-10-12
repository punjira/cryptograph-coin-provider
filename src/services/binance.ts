/**
 * binance related services
 */

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import {
     binanceBaseAddress,
     binanceExchangeInfo,
     binancePrefix,
} from '../endpoint';

interface BinanceExchangeResponse {
     symbols: {
          symbol: string;
          status: string;
     };
}

export const getExchangeInfo = () => {
     return new Promise((resolve, reject) => {
          const options: AxiosRequestConfig = {
               method: 'GET',
               url: binanceBaseAddress + binancePrefix + binanceExchangeInfo,
          };
          axios(options)
               .then((data: AxiosResponse<BinanceExchangeResponse>) => {})
               .catch((err) => {
                    console.log(err);
               });
     });
};
