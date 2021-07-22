import { Database } from '..';
import { HttpError } from '../../error/HttpError';
import { Catalogue } from '../../models/Catalogue';

export const CatalogueDb = {
  getCatalogues() {
    return Database.executeQuery(
      'SELECT id_kataloga as "id", \
              datum as "date", \
              rb as "catalogueSeqNum",  \
              id_dobavljaca as "supplierId" \
       FROM katalog'
    );
  },
  async getCatalogue(id: number) {
    const catalogue = await Database.executeQuery(
      'SELECT id_kataloga as "id", \
              datum as "date", \
              rb as "catalogueSeqNum", \
              id_dobavljaca as "supplierId"\
       FROM katalog WHERE id_kataloga = $1',
      [id]
    );

    if (!catalogue) {
      throw new HttpError(404, 'Catalogue not found!');
    }

    return catalogue;
  },
  insertCatalogue(catalogue: Catalogue) {
    return Database.executeQuery(
      'INSERT INTO katalog(id_kataloga, datum, rb, id_dobavljaca) VALUES($1, $2, $3, $4)',
      [
        catalogue.getCatalogueId(),
        catalogue.getDate(),
        catalogue.getCatalogueSeqNum(),
        catalogue.getSupplierId(),
      ]
    );
  },
  async updateCatalogue(catalogue: Catalogue) {
    const result = await Database.executeQuery(
      'UPDATE katalog SET datum = $1, rb = $2, id_dobavljaca = $3 WHERE id_kataloga = $4',
      [
        catalogue.getDate(),
        catalogue.getCatalogueSeqNum(),
        catalogue.getSupplierId(),
        catalogue.getCatalogueId(),
      ]
    );

    if (result.rowCount === 0) {
      throw new HttpError(404, 'Catalogue not found!');
    }
  },
  async deleteCatalogue(id: number) {
    const result = await Database.executeQuery('DELETE FROM katalog WHERE id_kataloga = $1', [id]);

    if (result.rowCount === 0) {
      throw new HttpError(404, 'Catalogue not found!');
    }
  },
};
