import { PriceDb } from '../db/modules/price';
import { Price } from '../models/Price';

export const PriceService = {
  async getPrices() {
    return PriceDb.getPrices();
  },
  async getPrice(productId: number, dateOfChange: string) {
    return PriceDb.getPrice(productId, dateOfChange);
  },
  async insertPrice(price: Price) {
    return PriceDb.insertPrice(price);
  },
  async updatePrice(price: Price) {
    return PriceDb.updatePrice(price);
  },
  async deletePrice(productId: number, dateOfChange: string): Promise<void> {
    return PriceDb.deletePrice(productId, dateOfChange);
  },
};
