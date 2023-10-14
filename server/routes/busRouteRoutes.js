import express from "express";
import {
    createBusRoute,
    getBusRoutesBySearch,
} from "../controllers/busRouteController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, createBusRoute);
router.route("/search/:term").get(protect, getBusRoutesBySearch);

export default router;
