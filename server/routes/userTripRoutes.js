import express from "express";
import {
  createUserTrip,
  getAllUserTrips,
  getUserTripById,
  getUserTrips,
  updateUserTrip,
  getRevenueByYear,
} from "../controllers/userTripController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/revenue/:year").get(getRevenueByYear);
router.route("/").get(getAllUserTrips).post(protect, createUserTrip);
router.route("/:id").get(protect, getUserTripById).put(protect, updateUserTrip);
router.route("/get/:limit").get(protect, getUserTrips);

export default router;
