import { SupplierDb } from '../db/modules/supplier';
import { Supplier } from '../models/Supplier';

export const SupplierService = {
  async getSuppliers() {
    return SupplierDb.getSuppliers();
  },
  async getSupplier(id: string) {
    return SupplierDb.getSupplier(id);
  },
  async insertSupplier(supplier: Supplier) {
    return SupplierDb.insertSupplier(supplier);
  },
  async updateSupplier(supplier: Supplier) {
    return SupplierDb.updateSupplier(supplier);
  },
  async deleteSupplier(id: number): Promise<void> {
    return SupplierDb.deleteSupplier(id);
  },
};
