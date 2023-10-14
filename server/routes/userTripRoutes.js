import express from "express";
import {
    createUserTrip,
    getUserTripById,
    getUserTrips,
    updateUserTrip,
} from "../controllers/userTripController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
    .get(protect, getUserTrips)
    .post(protect, createUserTrip);
router.route("/:id")
    .get(protect, getUserTripById)
    .put(protect, updateUserTrip);
router.route("/get/:limit").get(protect, getUserTrips);

export default router;
