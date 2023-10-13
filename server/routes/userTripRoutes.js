import express from "express";
import { createUserTrip } from "../controllers/userTripController.js";

const router = express.Router();

router.route("/").post(createUserTrip);

export default router;