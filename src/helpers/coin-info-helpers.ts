import { Coin } from '../models/coin-info';
import { Exchange } from '../models/exchange-model';

/**
 *
 * @param info coin info array
 * @param exchange binance exchange array
 *
 * this function only filters coins that have an exchange object in database
 *
 * ex: bnbada won't pass but btcusdt will, because btcusdt is a valid exchange
 *
 */
export function filterCoinInfoOnExchange(
     info: Coin[],
     exchange: Exchange[]
): Coin[] {
     const exchangeSymbol = exchange.map((el) => el.ticker.split('usdt')[0]);
     return info
          .filter((el) => exchangeSymbol.includes(el.ticker))
          .map((el) => ({ ...el, ticker: el.ticker + 'usdt' }));
}

/**
 *
 * @param info old database coin-info array
 * @param newInfo new array fetched from server
 *
 * filter data with this function to avoid getting duplication error
 */
export function filterCoinDuplicated(info: Coin[], newInfo: Coin[]): Coin[] {
     const tickers = info.map((el) => el.ticker);
     const NewItems = newInfo.filter((el) => !tickers.includes(el.ticker));
     return removeDuplicatedTickers(NewItems);
}

function removeDuplicatedTickers(data: Coin[]): Coin[] {
     let coins: Coin[] = [];
     data.forEach((el) => {
          if (!coins.map((el) => el.ticker).includes(el.ticker)) {
               coins.push(el);
          }
     });
     return coins;
}
