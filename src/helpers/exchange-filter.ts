import { Exchange } from '@cryptograph-app/shared-models';

/**
 *
 * @param symbols : array of all binance supported exchanges
 *
 * binance returns all of its supported exchanges, we only want those that end in usdt
 */
export function filterUSDTQuotes(symbols: string[]): string[] {
     const usdt_on_quote = /^usdt\w+/;
     const up_down_in_middle = /.*(up|down)\w+/;
     const filtered = symbols
          .map((el) => el.toLowerCase())
          .filter((el) => el.split('usdt').length > 1)
          .filter((el) => !usdt_on_quote.test(el))
          .filter((el) => !up_down_in_middle.test(el));
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
