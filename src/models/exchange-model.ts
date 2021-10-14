import mongoose from 'mongoose';

export interface Exchange {
     ticker: string;
}

const exchangeSchema = new mongoose.Schema<Exchange>({
     ticker: {
          type: String,
          required: true,
          unique: true,
     },
});

const createExchangeDocumentFromStringArray = (data: string[]): Exchange[] => {
     return data.map((el) => ({ ticker: el }));
};

const ExchangeModel = mongoose.model<Exchange>('exchange', exchangeSchema);

export { ExchangeModel, createExchangeDocumentFromStringArray };
