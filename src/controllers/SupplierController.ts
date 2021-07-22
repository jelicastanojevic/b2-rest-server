import { RequestHandler } from 'express';
import { getLogger } from 'log4js';

import { Supplier } from '../models/Supplier';
import { SupplierService } from '../services/SupplierService';

const logger = getLogger('SupplierController.ts');

interface ISupplierController {
  getSuppliers: RequestHandler;
  getSupplier: RequestHandler;
  insertSupplier: RequestHandler;
  updateSupplier: RequestHandler;
  deleteSupplier: RequestHandler;
}

export const SupplierController: ISupplierController = {
  async getSuppliers(req, res) {
    try {
      const suppliers = await SupplierService.getSuppliers();
      const tableColumns = [
        'RB',
        'PIB',
        'Naziv',
        'Adresa',
        'Email',
        'Matični Broj',
        'Naziv Banke',
        'Broj Računa',
        'Telefon',
      ];

      return res.status(200).send({ tableColumns: tableColumns, tableData: suppliers.rows });
    } catch (error) {
      logger.error(error);
      return res
        .status(error.status || 500)
        .send({ message: error.message || 'Internal server error', error });
    }
  },
  async insertSupplier(req, res) {
    try {
      const supplier = new Supplier(
        req.body.pib,
        req.body.name,
        req.body.address,
        req.body.email,
        req.body.nationalId,
        req.body.bankName,
        req.body.bankAccountNumber,
        req.body.telephoneNumber
      );
      const { insertId } = await SupplierService.insertSupplier(supplier);

      return res.status(201).send({ insertId });
    } catch (error) {
      logger.error(error);
      return res
        .status(error.status || 500)
        .send({ message: error.message || 'Internal server error', error });
    }
  },
  async getSupplier(req, res) {
    try {
      let { id } = req.params;
      const supplier = await SupplierService.getSupplier(id);

      return res.status(200).send({ supplier });
    } catch (error) {
      logger.error(error);
      return res
        .status(error.status || 500)
        .send({ message: error.message || 'Internal server error', error });
    }
  },
  async updateSupplier(req, res) {
    try {
      const supplier = new Supplier(
        req.params.id,
        req.body.name,
        req.body.address,
        req.body.email,
        req.body.nationalId,
        req.body.bankName,
        req.body.bankAccountNumber,
        req.body.telephoneNumber
      );
      const updatedSupplier = await SupplierService.updateSupplier(supplier);

      return res.status(200).send({ updatedSupplier });
    } catch (error) {
      logger.error(error);
      return res
        .status(error.status || 500)
        .send({ message: error.message || 'Internal server error', error });
    }
  },
  async deleteSupplier(req, res) {
    try {
      let { id } = req.params;
      const supplier = await SupplierService.deleteSupplier(id);

      return res.status(200).send({ supplier });
    } catch (error) {
      logger.error(error);
      return res
        .status(error.status || 500)
        .send({ message: error.message || 'Internal server error', error });
    }
  },
};
