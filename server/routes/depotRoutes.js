import express from "express";
import {
  createDepot,
  getAllDepots,
  getDepotByDepotName,
  getDepotById,
  updateDepotById,
  deleteDepotById,
} from "../controllers/depotController.js";

const router = express.Router();

router.route("/").post(createDepot);
router.route("/").get(getAllDepots);
router.route("/:id").get(getDepotById);
router.route("/:id").put(updateDepotById);
router.route("/:id").delete(deleteDepotById);
router.route("/name/:name").get(getDepotByDepotName);

export default router;
