import mongoose from 'mongoose';
import {} from '@cryptograph-app/shared-models';

const CoinModel = mongoose.model<Coin>('coin', coinSchema);

export { CoinModel, Coin, createCoinDocumentFromCoingeckoResponse };
