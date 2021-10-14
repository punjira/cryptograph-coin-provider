import { Exchange } from '../models/exchange-model';

/**
 *
 * @param symbols : array of all binance supported exchanges
 *
 * binance returns all of its supported exchanges, we only want those that end in usdt
 */
export function filterUSDTQuotes(symbols: string[]): string[] {
     const filtered = symbols
          .map((el) => el.toLowerCase())
          .filter((el) => el.split('usdt').length > 1);
     return filtered;
}

/**
 *
 * @param data old binance exchange document stored in database
 * @param newData new binance array
 */
export function findNewDocuments(
     data: Exchange[],
     newData: Exchange[]
): Exchange[] {
     const tickers = data.map((el) => el.ticker);
     return newData.filter((el) => !tickers.includes(el.ticker));
}
