import { Database } from '..';
import { HttpError } from '../../error/HttpError';
import { Price } from '../../models/Price';

export const PriceDb = {
  getPrices() {
    return Database.executeQuery(
      'SELECT id_proizvoda as "productId", \
              datum_promene as "dateOfChange",\
              cena as "price" \
              FROM istorija_cena ORDER BY datum_promene DESC'
    );
  },
  async getPrice(productId: number, dateOfChange: string) {
    const price = await Database.executeQuery(
      "SELECT id_proizvoda as 'productId', \
              datum_promene as 'dateOfChange',\
              cena as 'price'\
              FROM istorija_cena \
              WHERE id_proizvoda = $1 AND datum_promene::text LIKE '" +
        dateOfChange +
        "%'",
      [productId]
    );

    if (!price) {
      throw new HttpError(404, 'Price not found!');
    }

    return price;
  },
  insertPrice(price: Price) {
    if (price.getDateOfChange() === null) {
      return Database.executeQuery('INSERT INTO istorija_cena(id_proizvoda, cena) VALUES($1, $2)', [
        price.getProductId(),
        price.getPrice(),
      ]);
    }
    return Database.executeQuery(
      'INSERT INTO istorija_cena(id_proizvoda, datum_promene, cena) VALUES($1, $2, $3)',
      [price.getProductId(), price.getDateOfChange(), price.getPrice()]
    );
  },
  async updatePrice(price: Price) {
    const result = await Database.executeQuery(
      "UPDATE istorija_cena SET cena = $1 \
                           WHERE id_proizvoda = $2 AND datum_promene::text LIKE '" +
        price.getDateOfChange() +
        "%'",
      [price.getPrice(), price.getProductId()]
    );

    if (result.rowCount === 0) {
      throw new HttpError(404, 'Price not found!');
    }
  },
  async deletePrice(productId: number, dateOfChange: string) {
    const result = await Database.executeQuery(
      "DELETE FROM istorija_cena WHERE id_proizvoda = $1 AND datum_promene::text LIKE '" +
        dateOfChange +
        "%'",
      [productId]
    );

    if (result.rowCount === 0) {
      throw new HttpError(404, 'Price not found!');
    }
  },
};
