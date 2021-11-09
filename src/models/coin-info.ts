import mongoose from 'mongoose';
import { Coin, CoinSchema } from '@cryptograph-app/shared-models';

const CoinModel = mongoose.model<Coin>('coin', CoinSchema);

export { CoinModel };
