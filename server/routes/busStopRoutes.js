import express from 'express';
import {
  createBusStop,
  deleteBusStop,
  getBusStopById,
  getBusStops,
  updateBusStop,
} from '../controllers/busStopController.js';

const router = express.Router();

router.route('/').get(getBusStops).post(createBusStop);
router
  .route('/:id')
  .get(getBusStopById)
  .put(updateBusStop)
  .delete(deleteBusStop);

export default router;
