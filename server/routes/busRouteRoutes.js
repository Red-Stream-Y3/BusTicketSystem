import express from 'express';
import {
  createBusRoute,
  getBusRoutesBySearch,
  getBusRoutes,
  getBusRouteCount,
  getBusRouteById,
  updateBusRouteById,
  deleteBusRouteById,
} from '../controllers/busRouteController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getBusRoutes).post(createBusRoute);
router.route('/count').get(getBusRouteCount);
router
  .route('/:id')
  .get(getBusRouteById)
  .put(updateBusRouteById)
  .delete(deleteBusRouteById);
router.route('/search/:term').get(getBusRoutesBySearch);

export default router;
