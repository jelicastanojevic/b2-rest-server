import * as express from 'express';

import { PriceController } from '../controllers/PriceController';

const priceRoutes = express.Router();

// #region
/**
 * @api {get} / Get prices
 * @apiDescription Returns prices
 * @apiVersion 1.0.0
 * @apiGroup Price
 *
 * @apiSuccessExample {json} Success response:
 *     HTTPS 200 OK
 *	[]
 */
// #endregion
priceRoutes.get('/', PriceController.getPrices);

priceRoutes.get('/:productId', PriceController.getPrice);

priceRoutes.post('/', PriceController.insertPrice);

priceRoutes.put('/:productId', PriceController.updatePrice);

priceRoutes.delete('/:productId', PriceController.deletePrice);

export { priceRoutes };
