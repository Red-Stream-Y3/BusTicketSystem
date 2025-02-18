import express from "express";
import {
  createBusJourney,
  getBusJourneys,
  getBusJourneyById,
  updateBusJourney,
  deleteBusJourney,
  getBusJourneyByUser,
  scheduleBusJourney,
  updateScheduleJourney,
  getDepartedJourneys,
  getAllBusJourneys,
} from "../controllers/busJourneyController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/all").get(getAllBusJourneys);
router.route("/departed").get(getDepartedJourneys);
router.route("/").post(protect, createBusJourney).get(getBusJourneys);
router.route("/schedule").post(scheduleBusJourney);
router.route("/schedule/:id").put(updateScheduleJourney);
router
  .route("/:id")
  .get(getBusJourneyById)
  .put(protect, updateBusJourney)
  .delete(deleteBusJourney);
router.route("/user/:limit").get(protect, getBusJourneyByUser);

export default router;
