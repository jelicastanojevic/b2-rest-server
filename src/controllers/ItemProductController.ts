import { RequestHandler } from 'express';
import { getLogger } from 'log4js';

import { ItemProduct } from '../models/ItemProduct';
import { ItemProductService } from '../services/ItemProductService';

const logger = getLogger('ItemProductController.ts');

interface IItemProductController {
  getItemProducts: RequestHandler;
  getItemProduct: RequestHandler;
  insertItemProduct: RequestHandler;
  updateItemProduct: RequestHandler;
  deleteItemProduct: RequestHandler;
}

export const ItemProductController: IItemProductController = {
  async getItemProducts(req, res) {
    try {
      const itemProducts = await ItemProductService.getItemProducts();
      const tableColumns = ['RB', 'Šifra kataloga', 'Redni broj stavke', 'Šifra proizvoda'];

      return res.status(200).send({ tableColumns: tableColumns, tableData: itemProducts.rows });
    } catch (error) {
      logger.error(error);
      return res
        .status(error.status || 500)
        .send({ message: error.message || 'Internal server error', error });
    }
  },
  async getItemProduct(req, res) {
    try {
      let { catalogueId } = req.params;
      let { itemSeqNum } = req.body;
      const itemProduct = await ItemProductService.getItemProduct(catalogueId, itemSeqNum);

      return res.status(200).send({ itemProduct });
    } catch (error) {
      logger.error(error);
      return res
        .status(error.status || 500)
        .send({ message: error.message || 'Internal server error', error });
    }
  },
  async insertItemProduct(req, res) {
    try {
      const itemProduct = new ItemProduct(
        req.body.catalogueId,
        req.body.itemSeqNum,
        req.body.productId
      );
      const { insertId } = await ItemProductService.insertItemProduct(itemProduct);

      return res.status(201).send({ insertId });
    } catch (error) {
      logger.error(error);
      return res
        .status(error.status || 500)
        .send({ message: error.message || 'Internal server error', error });
    }
  },
  async updateItemProduct(req, res) {
    try {
      const itemProduct = new ItemProduct(
        req.body.catalogueId,
        req.body.itemSeqNum,
        req.body.productId
      );
      const updatedItemProduct = await ItemProductService.updateItemProduct(itemProduct);

      return res.status(200).send({ updatedItemProduct });
    } catch (error) {
      logger.error(error);
      return res
        .status(error.status || 500)
        .send({ message: error.message || 'Internal server error', error });
    }
  },
  async deleteItemProduct(req, res) {
    try {
      let { id } = req.params;
      let { itemSeqNum } = req.body;
      const itemProduct = await ItemProductService.deleteItemProduct(id, itemSeqNum);

      return res.status(200).send({ itemProduct });
    } catch (error) {
      logger.error(error);
      return res
        .status(error.status || 500)
        .send({ message: error.message || 'Internal server error', error });
    }
  },
};
