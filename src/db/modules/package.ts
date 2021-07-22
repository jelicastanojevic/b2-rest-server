import { Database } from '..';
import { HttpError } from '../../error/HttpError';
import { Package } from '../../models/Package';

export const PackageDb = {
  getPackages() {
    return Database.executeQuery(
      'SELECT id_tipa_pakovanja as "id", \
              naziv_tipa_pakovanja as "name" \
       FROM tip_pakovanja'
    );
  },
  async getPackage(id: number) {
    const drugPackage = await Database.executeQuery(
      'SELECT id_tipa_pakovanja as "id", \
              naziv_tipa_pakovanja as "name" \
       FROM tip_pakovanja WHERE id_tipa_pakovanja = $1',
      [id]
    );

    if (!drugPackage) {
      throw new HttpError(404, 'Package not found!');
    }

    return drugPackage;
  },
  insertPackage(drugPackage: Package) {
    return Database.executeQuery(
      'INSERT INTO tip_pakovanja(id_tipa_pakovanja, naziv_tipa_pakovanja) VALUES($1, $2)',
      [drugPackage.getId(), drugPackage.getName()]
    );
  },
  async updatePackage(id: number, drugPackage: Package) {
    const result = await Database.executeQuery(
      'UPDATE tip_pakovanja SET id_tipa_pakovanja = $1, naziv_tipa_pakovanja = $2 WHERE id_tipa_pakovanja = $3',
      [drugPackage.getId(), drugPackage.getName(), id]
    );

    if (result.rowCount === 0) {
      throw new HttpError(404, 'Drug not found!');
    }
  },
  async deletePackage(id: number) {
    const result = await Database.executeQuery(
      'DELETE FROM tip_pakovanja WHERE id_tipa_pakovanja = $1',
      [id]
    );

    if (result.rowCount === 0) {
      throw new HttpError(404, 'Drug not found!');
    }
  },
};
