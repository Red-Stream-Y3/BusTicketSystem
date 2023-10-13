import express from "express";
import { createBus } from "../controllers/busController.js";

const router = express.Router();

router.route("/").post(createBus);

export default router;