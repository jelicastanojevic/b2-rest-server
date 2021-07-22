import { RequestHandler } from 'express';
import { getLogger } from 'log4js';

import { PriceDb } from '../db/modules/price';
import { Price } from '../models/Price';
import { PriceService } from '../services/PriceService';

const logger = getLogger('PriceController.ts');

interface IPriceController {
  getPrices: RequestHandler;
  getPrice: RequestHandler;
  insertPrice: RequestHandler;
  updatePrice: RequestHandler;
  deletePrice: RequestHandler;
}

export const PriceController: IPriceController = {
  async getPrices(req, res) {
    try {
      const prices = await PriceService.getPrices();
      const tableColumns = ['RB', 'Šifra proizvoda', 'Datum promene', 'Cena'];

      return res.status(200).send({ tableColumns: tableColumns, tableData: prices.rows });
    } catch (error) {
      logger.error(error);
      return res
        .status(error.status || 500)
        .send({ message: error.message || 'Internal server error', error });
    }
  },
  async insertPrice(req, res) {
    try {
      const price = new Price(req.body.productId, req.body.dateOfChange, req.body.price);
      const { insertId } = await PriceDb.insertPrice(price);

      return res.status(201).send({ insertId });
    } catch (error) {
      logger.error(error);
      return res
        .status(error.status || 500)
        .send({ message: error.message || 'Internal server error', error });
    }
  },
  async getPrice(req, res) {
    try {
      let { id } = req.params;
      let { datumPromene } = req.body;

      const price = await PriceDb.getPrice(id, datumPromene);

      return res.status(200).send({ price });
    } catch (error) {
      logger.error(error);
      return res
        .status(error.status || 500)
        .send({ message: error.message || 'Internal server error', error });
    }
  },
  async updatePrice(req, res) {
    try {
      const price = new Price(req.params.productId, req.body.dateOfChange, req.body.price);

      const updatedPrice = await PriceDb.updatePrice(price);

      return res.status(200).send({ updatedPrice });
    } catch (error) {
      logger.error(error);
      return res
        .status(error.status || 500)
        .send({ message: error.message || 'Internal server error', error });
    }
  },
  async deletePrice(req, res) {
    try {
      let { productId } = req.params;
      let { dateOfChange } = req.body;

      const price = await PriceDb.deletePrice(productId, dateOfChange);
      return res.status(200).send({ price });
    } catch (error) {
      logger.error(error);
      return res
        .status(error.status || 500)
        .send({ message: error.message || 'Internal server error', error });
    }
  },
};
