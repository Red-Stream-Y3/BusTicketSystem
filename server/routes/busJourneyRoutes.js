import express from 'express';
import {
  createBusJourney,
  getBusJourneys,
  getBusJourneyById,
  updateBusJourney,
  deleteBusJourney,
} from '../controllers/busJourneyController.js';

const router = express.Router();

router.route('/').post(createBusJourney).get(getBusJourneys);
router
  .route('/:id')
  .get(getBusJourneyById)
  .put(updateBusJourney)
  .delete(deleteBusJourney);

export default router;
