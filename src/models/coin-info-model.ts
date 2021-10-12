import mongoose from 'mongoose';

export interface CoinInfoAttr {
     ticker: string;
     binanceTicker: string;
     coingeckoTicker: string;
}

interface CoinDocument extends mongoose.Document {
     ticker: string;
     binanceTicker: string;
     coingeckoTicker: string;
}

interface CoinInfoModel extends mongoose.Model<CoinDocument> {
     build(attr: CoinInfoAttr): CoinDocument;
}

const coinSchema = new mongoose.Schema({
     ticker: {
          type: String,
          required: true,
     },
     name: {
          type: String,
          required: true,
     },
     binanceTicker: {
          type: String,
          required: true,
     },
     coingeckoTicker: {
          type: String,
          required: true,
     },
});

coinSchema.statics.build = (attr: CoinInfoAttr) => {
     return new Coin();
};

const Coin = mongoose.model<CoinDocument, CoinInfoModel>('Coin', coinSchema);

export { Coin };
