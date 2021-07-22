import { Database } from '..';
import { HttpError } from '../../error/HttpError';
import { CatalogueItem } from '../../models/CatalogueItem';

export const CatalogueItemDb = {
  async getCatalogueItems() {
    return await Database.executeQuery(
      'SELECT id_kataloga as "catalogueId", \
              rb_stavke as "itemSeqNum", \
              naziv as "name" , \
              cena as "price", \
              jm as "measurementUnit", \
              popust as "discount", \
              id_fabrike  as "factoryId" \
       FROM stavka_kataloga'
    );
  },
  async getCatalogueItem(catalogueId: number, itemSeqNum: number) {
    const catalogueItem = await Database.executeQuery(
      'SELECT id_kataloga as "catalogueId", \
              rb_stavke as "itemSeqNum", \
              naziv as "name", \
              cena as "price", \
              jm as "measurementUnit", \
              popust as "discount", \
              id_fabrike  as "factoryId" \
              FROM stavka_kataloga WHERE id_kataloga = $1 and rb_stavke = $2',
      [catalogueId, itemSeqNum]
    );

    if (!catalogueItem) {
      throw new HttpError(404, 'Catalogue item not found!');
    }

    return catalogueItem;
  },
  async insertCatalogueItem(catalogueItem: CatalogueItem) {
    return await Database.executeQuery(
      'INSERT INTO stavka_kataloga(id_kataloga, rb_stavke, naziv, cena, jm, popust, id_fabrike) VALUES($1, $2, $3, $4, $5, $6, $7)',
      [
        catalogueItem.getCatalogueId(),
        catalogueItem.getCatalogueItemSeqNum(),
        catalogueItem.getName(),
        catalogueItem.getPrice(),
        catalogueItem.getMeasurementUnit(),
        catalogueItem.getDiscount(),
        catalogueItem.getFactoryId(),
      ]
    );
  },
  async updateCatalogueItem(catalogueItem: CatalogueItem) {
    console.log(catalogueItem);
    const result = await Database.executeQuery(
      'UPDATE stavka_kataloga SET naziv = $1, cena = $2, jm = $3, popust = $4, id_fabrike = $5 WHERE id_kataloga = $6 AND rb_stavke=$7',
      [
        catalogueItem.getName(),
        catalogueItem.getPrice(),
        catalogueItem.getMeasurementUnit(),
        catalogueItem.getDiscount(),
        catalogueItem.getFactoryId(),
        catalogueItem.getCatalogueId(),
        catalogueItem.getCatalogueItemSeqNum(),
      ]
    );

    if (result.rowCount === 0) {
      throw new HttpError(404, 'Catalogue item not found!');
    }
  },
  async deleteCatalogueItem(catalogueId: number, itemSeqNum: number) {
    const result = await Database.executeQuery(
      'DELETE FROM stavka_kataloga WHERE id_kataloga = $1 AND rb_stavke = $2',
      [catalogueId, itemSeqNum]
    );

    if (result.rowCount === 0) {
      throw new HttpError(404, 'Catalogue item not found!');
    }
  },
};
