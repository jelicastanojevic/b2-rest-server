import { Database } from '..';
import { HttpError } from '../../error/HttpError';
import { Product } from '../../models/Product';

export const ProductDb = {
  getProducts() {
    return Database.executeQuery(
      'SELECT id_proizvoda as "id", \
              naziv_proizvoda as "name",\
              trenutna_cena as "currentPrice", \
              kolicina as "amount", \
              naziv_tipa_pakovanja as "packageType", \
              id_fabrike as "factoryId" \
              FROM proizvod ORDER BY id_proizvoda'
    );
  },
  async getProduct(productId: number) {
    const product = await Database.executeQuery(
      'SELECT id_proizvoda as "id", \
              naziv_proizvoda as "name",\
              trenutna_cena as "currentPrice", \
              kolicina as "amount", \
              naziv_tipa_pakovanja as "packageType", \
              id_fabrike as "factoryId" \
              FROM proizvod \
              WHERE id_proizvoda = ?$1',
      [productId]
    );

    if (!product) {
      throw new HttpError(404, 'Product not found!');
    }
    return product;
  },
  insertProduct(product: Product) {
    return Database.executeQuery(
      'INSERT INTO proizvod(id_proizvoda, naziv_proizvoda, trenutna_cena, kolicina, naziv_tipa_pakovanja, id_fabrike) VALUES($1, $2, $3, $4, $5, $6)',
      [
        product.getId(),
        product.getName(),
        product.getCurrentPrice(),
        product.getAmount(),
        product.getPackageType(),
        product.getFactoryId(),
      ]
    );
  },
  async updateProduct(id: number, product: Product) {
    const result = await Database.executeQuery(
      'UPDATE proizvod SET id_proizvoda = $1, \
                           naziv_proizvoda = $2, \
                           trenutna_cena = $3, \
                           kolicina= $4, \
                           naziv_tipa_pakovanja = $5, \
                           id_fabrike = $6 \
                           WHERE id_proizvoda = $7',
      [
        product.getId(),
        product.getName(),
        product.getCurrentPrice(),
        product.getAmount(),
        product.getPackageType(),
        product.getFactoryId(),
        id,
      ]
    );

    if (result.rowCount === 0) {
      throw new HttpError(404, 'Product not found!');
    }
  },
  async deleteProduct(productId: number) {
    const result = await Database.executeQuery('DELETE FROM proizvod WHERE id_proizvoda = $1', [
      productId,
    ]);

    if (result.rowCount === 0) {
      throw new HttpError(404, 'Product not found!');
    }
  },
};
