import mongoose, { Document } from 'mongoose';
import { CoinGeckoCoinListResponse } from '../services/coingecko';

interface Coin {
     name: string;
     ticker: string;
     image: string;
}

const coinSchema = new mongoose.Schema<Coin>({
     name: {
          type: String,
          required: true,
          unique: true,
     },
     ticker: {
          type: String,
          required: true,
          unique: true,
     },
     image: {
          type: String,
          required: true,
          unique: true,
     },
});

const createCoinDocumentFromCoingeckoResponse = (
     data: CoinGeckoCoinListResponse[]
): Coin[] => {
     return data.map((el) => ({
          image: el.image,
          name: el.name,
          ticker: el.symbol,
     }));
};

const CoinModel = mongoose.model<Coin>('coin', coinSchema);

export { CoinModel, Coin, createCoinDocumentFromCoingeckoResponse };
