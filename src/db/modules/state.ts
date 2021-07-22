import { Database } from '..';
import { HttpError } from '../../error/HttpError';
import { State } from '../../models/State';

export const StateDb = {
  async getStates() {
    return await Database.executeQuery(
      'SELECT id_proizvoda as "productId", \
              id_skladisne_jedinice as "warehouseId",\
              datum_promene as "dateOfChange",\
              kolicina as "amount"\
              FROM stanje'
    );
  },
  async getState(productId: number, warehouseId: number, dateOfChange: string) {
    //dateOfChange format yyyy-mm-dd hh:mm:ss
    const state = await Database.executeQuery(
      "SELECT id_proizvoda as 'productId', \
              id_skladisne_jedinice as 'warehouseId',\
              datum_promene as 'dateOfChange',\
              kolicina as 'amount'\
              FROM stanje\
              WHERE id_proizvoda = $1 AND id_skladisne_jedinice = $2 AND datum_promene::text LIKE '" +
        dateOfChange +
        "%'",
      [productId, warehouseId]
    );

    if (!state) {
      throw new HttpError(404, 'State not found!');
    }
    return state;
  },
  async insertState(state: State) {
    return await Database.executeQuery(
      'INSERT INTO stanje(id_proizvoda, id_skladisne_jedinice, datum_promene, kolicina) VALUES($1, $2, $3, $4)',
      [state.getProductId(), state.getWarehouseId(), state.getDateOfChange(), state.getAmount()]
    );
  },
  async updateState(state: State) {
    const result = await Database.executeQuery(
      "UPDATE stanje SET  kolicina = $1 \
                           WHERE id_proizvoda = $2 and id_skladisne_jedinice = $3 and datum_promene::text LIKE '" +
        state.getDateOfChange() +
        "%'",
      [state.getAmount(), state.getProductId(), state.getWarehouseId()]
    );

    if (result.rowCount === 0) {
      throw new HttpError(404, 'State not found!');
    }
  },
  async deleteState(productId: number, warehouseId: number, dateOfChange: string) {
    const result = await Database.executeQuery(
      "DELETE FROM stanje WHERE id_proizvoda = $1 and id_skladisne_jedinice = $2 and datum_promene::text LIKE '" +
        dateOfChange +
        "%'",
      [productId, warehouseId]
    );

    if (result.rowCount === 0) {
      throw new HttpError(404, 'State not found!');
    }
  },
};
