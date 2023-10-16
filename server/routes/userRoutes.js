import express from "express";
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  getUserByUsernameAndRole,
  getUserCredits,
  updateUserCredits,
  getUserByEmail,
  getAllUsers,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/all").get(getAllUsers);
router.route("/create").post(registerUser);
router.route("/edit/:id").put(updateUser);
router.route("/delete/:id").delete(deleteUser);
router.route("/get/:id").get(getUserById);

router.route("/").post(registerUser).get(getUsers);
router.post("/login", authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
    .route("/:id")
    .delete(protect, deleteUser)
    .get(protect, getUserById)
    .put(protect, updateUser);
router.route("getbyrole/:username/:role").get(getUserByUsernameAndRole);
router
  .route("/credits/:username")
  .get(protect, getUserCredits)
  .put(protect, updateUserCredits);
router.route("/getbyemail/:email").get(getUserByEmail);

export default router;
