import { BinanceSymbol } from '../../services/binance';
import { filterUSDTQuotes } from '../exchange-filter';

describe('helper functions', () => {
     describe('filter usdt based', () => {
          let pairs: BinanceSymbol[];
          let correct_pairs: string[];
          beforeEach(() => {
               pairs = [
                    { symbol: 'adausdt', status: 'TRADING' },
                    { symbol: 'BTCUSDT', status: 'TRADING' },
                    { symbol: 'bnbUSDT', status: 'TRADING' },
                    { symbol: 'XRPBNB', status: 'TRADING' },
                    { symbol: 'ADATRX', status: 'TRADING' },
                    { symbol: 'TRXUSDT', status: 'TRADING' },
                    { symbol: 'BNBETH', status: 'TRADING' },
               ];
               correct_pairs = ['adausdt', 'btcusdt', 'bnbusdt', 'trxusdt'];
          });
          it('should find usdt based pairs', () => {
               expect(filterUSDTQuotes(pairs)).toEqual(correct_pairs);
          });
     });
});
