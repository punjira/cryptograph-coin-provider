import { filterUSDTQuotes } from '../exchange-filter';

describe('helper functions', () => {
     describe('filter usdt based', () => {
          let pairs: string[];
          let correct_pairs: string[];
          beforeEach(() => {
               pairs = [
                    'adausdt',
                    'BTCUSDT',
                    'bnbUSDT',
                    'XRPBNB',
                    'ADATRX',
                    'TRXUSDT',
                    'BNBETH',
               ];
               correct_pairs = ['adausdt', 'btcusdt', 'bnbusdt', 'trxusdt'];
          });
          it('should find usdt based pairs', () => {
               expect(filterUSDTQuotes(pairs)).toEqual(correct_pairs);
          });
     });
});
