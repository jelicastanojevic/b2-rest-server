import { Database } from '..';
import { HttpError } from '../../error/HttpError';
import { ItemProduct } from '../../models/ItemProduct';

export const ItemProductDb = {
  getItemProducts() {
    return Database.executeQuery(
      'SELECT id_kataloga as "catalogueId", \
              rb_stavke as "itemSeqNum", \
              id_proizvoda as "productId" \
       FROM stavka_proizvod'
    );
  },
  async getItemProduct(catalogueId: number, itemSeqNum: number) {
    const itemProduct = await Database.executeQuery(
      'SELECT id_kataloga as "catalogueId", \
              rb_stavke as "itemSeqNum", \
              id_proizvoda as "productId" \
              FROM stavka_proizvod WHERE id_kataloga = $1 and rb_stavke = $2',
      [catalogueId, itemSeqNum]
    );

    if (!itemProduct) {
      throw new HttpError(404, 'Product not found!');
    }

    return itemProduct;
  },
  insertItemProduct(itemProduct: ItemProduct) {
    return Database.executeQuery(
      'INSERT INTO stavka_proizvod(id_kataloga, rb_stavke, id_proizvoda) VALUES($1, $2, $3)',
      [itemProduct.getCatalogueId(), itemProduct.getItemSeqNum(), itemProduct.getProductId()]
    );
  },
  async updateItemProduct(itemProduct: ItemProduct) {
    const result = await Database.executeQuery(
      'UPDATE stavka_proizvod SET id_proizvoda = $1 WHERE id_kataloga = $2 AND rb_stavke=$3',
      [itemProduct.getProductId(), itemProduct.getCatalogueId(), itemProduct.getItemSeqNum()]
    );

    if (result.rowCount === 0) {
      throw new HttpError(404, 'Product not found!');
    }
  },
  async deleteItemProduct(catalogueId: number, itemSeqNum: number) {
    const result = await Database.executeQuery(
      'DELETE FROM stavka_proizvod WHERE id_kataloga = $1 AND rb_stavke = $2',
      [catalogueId, itemSeqNum]
    );

    if (result.rowCount === 0) {
      throw new HttpError(404, 'Product not found!');
    }
  },
};
