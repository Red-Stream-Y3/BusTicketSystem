import express from "express";
import { createBusRoute } from "../controllers/busRouteController.js";

const router = express.Router();

router.route("/").post(createBusRoute);

export default router;