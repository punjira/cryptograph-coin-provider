import mongoose from 'mongoose';

import { Exchange, ExchangeSchema } from '@cryptograph-app/shared-models';

const createExchangeDocumentFromStringArray = (data: string[]): Exchange[] => {
     return data.map((el) => ({ ticker: el }));
};

const ExchangeModel = mongoose.model<Exchange>('exchange', ExchangeSchema);

export { ExchangeModel, createExchangeDocumentFromStringArray };
