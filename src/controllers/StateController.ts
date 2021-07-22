import { RequestHandler } from 'express';
import { getLogger } from 'log4js';

import { State } from '../models/State';
import { StateService } from '../services/StateService';

const logger = getLogger('StateController.ts');

interface IStateController {
  getStates: RequestHandler;
  getState: RequestHandler;
  insertState: RequestHandler;
  updateState: RequestHandler;
  deleteState: RequestHandler;
}

export const StateController: IStateController = {
  async getStates(req, res) {
    try {
      const states = await StateService.getStates();
      const tableColumns = [
        'RB',
        'Šifra proizvoda',
        'Datum promene',
        'Šifra skladišta',
        'Količina',
      ];

      return res.status(200).send({ tableColumns: tableColumns, tableData: states.rows });
    } catch (error) {
      logger.error(error);
      return res
        .status(error.status || 500)
        .send({ message: error.message || 'Internal server error', error });
    }
  },
  async insertState(req, res) {
    try {
      const state = new State(
        req.body.productId,
        req.body.dateOfChange,
        req.body.warehouseId,
        req.body.amount
      );
      const { insertId } = await StateService.insertState(state);

      return res.status(201).send({ insertId });
    } catch (error) {
      logger.error(error);
      return res
        .status(error.status || 500)
        .send({ message: error.message || 'Internal server error', error });
    }
  },
  async getState(req, res) {
    try {
      let { productId, warehouseId, dateOfChange } = req.body;
      const state = await StateService.getState(productId, warehouseId, dateOfChange);

      return res.status(200).send({ state });
    } catch (error) {
      logger.error(error);
      return res
        .status(error.status || 500)
        .send({ message: error.message || 'Internal server error', error });
    }
  },
  async updateState(req, res) {
    try {
      const state = new State(
        req.params.id,
        req.body.dateOfChange,
        req.body.warehouseId,
        req.body.amount
      );
      const updatedState = await StateService.updateState(state);

      return res.status(200).send({ updatedState });
    } catch (error) {
      logger.error(error);
      return res
        .status(error.status || 500)
        .send({ message: error.message || 'Internal server error', error });
    }
  },
  async deleteState(req, res) {
    try {
      let { productId, warehouseId, dateOfChange } = req.body;
      const state = await StateService.deleteState(productId, warehouseId, dateOfChange);

      return res.status(200).send({ state });
    } catch (error) {
      logger.error(error);
      return res
        .status(error.status || 500)
        .send({ message: error.message || 'Internal server error', error });
    }
  },
};
