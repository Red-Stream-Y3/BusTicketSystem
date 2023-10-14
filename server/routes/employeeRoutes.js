import express from "express";
import {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  getEmployeesByRole,
  getEmployeesByRoleAndDepot,
  getEmployeesByDepot,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employeeController.js";

const router = express.Router();

router.route("/").post(createEmployee);
router.route("/").get(getAllEmployees);
router.route("/:id").get(getEmployeeById);
router.route("/:id").put(updateEmployee);
router.route("/:id").delete(deleteEmployee);
router.route("/role/:role").get(getEmployeesByRole);
router.route("/role/:role/depot/:depot").get(getEmployeesByRoleAndDepot);
router.route("/depot/:depot").get(getEmployeesByDepot);

export default router;
