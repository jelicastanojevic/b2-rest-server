import { RequestHandler } from 'express';
import { getLogger } from 'log4js';

import { CatalogueItem } from '../models/CatalogueItem';
import { CatalogueItemService } from '../services/CatalogueItemService';

const logger = getLogger('CatalogueItemController.ts');

interface ICatalogueItemController {
  getCatalogueItems: RequestHandler;
  getCatalogueItem: RequestHandler;
  insertCatalogueItem: RequestHandler;
  updateCatalogueItem: RequestHandler;
  deleteCatalogueItem: RequestHandler;
}

export const CatalogueItemController: ICatalogueItemController = {
  async getCatalogueItems(req, res) {
    try {
      const catalogueItems = await CatalogueItemService.getCatalogueItems();
      const tableColumns = [
        'RB',
        'Šifra kataloga',
        'Redni broj stavke kataloga',
        'Naziv',
        'Cena',
        'Jedinica mere',
        'Popust',
        'Šifra fabrike',
      ];

      return res.status(200).send({ tableColumns: tableColumns, tableData: catalogueItems.rows });
    } catch (error) {
      logger.error(error);
      return res
        .status(error.status || 500)
        .send({ message: error.message || 'Internal server error', error });
    }
  },
  async getCatalogueItem(req, res) {
    try {
      let { id } = req.params;
      let { rbStavke } = req.body;
      const catalogueItem = await CatalogueItemService.getCatalogueItem(id, rbStavke);

      return res.status(200).send({ catalogueItem });
    } catch (error) {
      logger.error(error);
      return res
        .status(error.status || 500)
        .send({ message: error.message || 'Internal server error', error });
    }
  },
  async insertCatalogueItem(req, res) {
    try {
      const catalogueItem = new CatalogueItem(
        req.body.catalogueId,
        req.body.itemSeqNum,
        req.body.name,
        req.body.price,
        req.body.measurementUnit,
        req.body.discount,
        req.body.factoryId
      );
      const { insertId } = await CatalogueItemService.insertCatalogueItem(catalogueItem);

      return res.status(201).send({ insertId });
    } catch (error) {
      logger.error(error);
      return res
        .status(error.status || 500)
        .send({ message: error.message || 'Internal server error', error });
    }
  },
  async updateCatalogueItem(req, res) {
    try {
      console.log(req.params);
      const catalogueItem = new CatalogueItem(
        req.params.id,
        req.body.itemSeqNum,
        req.body.name,
        req.body.price,
        req.body.measurementUnit,
        req.body.discount,
        req.body.factoryId
      );

      const updatedCatalogueItem = await CatalogueItemService.updateCatalogueItem(catalogueItem);

      return res.status(200).send({ updatedCatalogueItem });
    } catch (error) {
      logger.error(error);
      return res
        .status(error.status || 500)
        .send({ message: error.message || 'Internal server error', error });
    }
  },
  async deleteCatalogueItem(req, res) {
    try {
      let { id } = req.params;
      let { itemSeqNum } = req.body;
      const catalogueItem = await CatalogueItemService.deleteCatalogueItem(id, itemSeqNum);

      return res.status(200).send({ catalogueItem });
    } catch (error) {
      logger.error(error);
      return res
        .status(error.status || 500)
        .send({ message: error.message || 'Internal server error', error });
    }
  },
};
