import express from "express";
import {
    createBusJourney,
    getBusJourneys,
    getBusJourneyById,
    updateBusJourney,
    deleteBusJourney,
} from "../controllers/busJourneyController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, createBusJourney).get(getBusJourneys);
router
    .route("/:id")
    .get(getBusJourneyById)
    .put(protect, updateBusJourney)
    .delete(deleteBusJourney);

export default router;
