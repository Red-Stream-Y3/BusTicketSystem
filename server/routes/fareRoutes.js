import express from "express";
import {
  createFare,
  getAllFares,
  getFareByFareName,
  getFareById,
  getFareByRoute,
  updateFareById,
  deleteFareById,
} from "../controllers/fareController.js";

const router = express.Router();

router.route("/").post(createFare);
router.route("/").get(getAllFares);
router.route("/:id").get(getFareById);
router.route("/:id").put(updateFareById);
router.route("/:id").delete(deleteFareById);
router.route("/name/:name").get(getFareByFareName);
router.route("/route/:route").get(getFareByRoute);

export default router;
