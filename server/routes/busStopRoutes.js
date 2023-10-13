import express from "express";
import { createBusStop } from "../controllers/busStopController.js";

const router = express.Router();

router.route("/").post(createBusStop);

export default router;