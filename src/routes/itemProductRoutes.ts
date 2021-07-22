import * as express from 'express';

import { ItemProductController } from '../controllers/ItemProductController';

const itemProductRoutes = express.Router();

// #region
/**
 * @api {get} / Get item products
 * @apiDescription Returns item products
 * @apiVersion 1.0.0
 * @apiGroup Item products
 *
 * @apiSuccessExample {json} Success response:
 *     HTTPS 200 OK
 *	[]
 */
// #endregion
itemProductRoutes.get('/', ItemProductController.getItemProducts);
itemProductRoutes.get('/:id', ItemProductController.getItemProduct);

itemProductRoutes.post('/', ItemProductController.insertItemProduct);
itemProductRoutes.put('/', ItemProductController.updateItemProduct);
itemProductRoutes.delete('/:id', ItemProductController.deleteItemProduct);

export { itemProductRoutes };
