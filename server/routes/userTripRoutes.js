import express from "express";
import {
    createUserTrip,
    deleteUserTrip,
    getAllUserTrips,
    getUserTripById,
    getUserTrips,
    updateUserTrip,
} from "../controllers/userTripController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getAllUserTrips).post(protect, createUserTrip);
router
    .route("/:id")
    .get(protect, getUserTripById)
    .delete(protect, deleteUserTrip)
    .put(protect, updateUserTrip);
router.route("/get/:limit").get(protect, getUserTrips);

export default router;
