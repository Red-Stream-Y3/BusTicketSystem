import express from "express";
import {
  createBus,
  getAllBuses,
  getBusByBusNumber,
  getBusById,
  getBusCount,
  getBusesByCapacity,
  getBusesByRoute,
  getBusesByRouteAndType,
  getBusesByType,
  updateBusById,
  deleteBusById,
} from "../controllers/busController.js";

const router = express.Router();

router.route("/").post(createBus);
router.route("/").get(getAllBuses);
router.route("/count").get(getBusCount);
router.route("/:id").get(getBusById);
router.route("/:id").put(updateBusById);
router.route("/:id").delete(deleteBusById);
router.route("/number/:number").get(getBusByBusNumber);
router.route("/type/:type").get(getBusesByType);
router.route("/capacity/:capacity").get(getBusesByCapacity);
router.route("/route/:routeId").get(getBusesByRoute);
router.route("/route/:routeId/type/:type").get(getBusesByRouteAndType);

export default router;
