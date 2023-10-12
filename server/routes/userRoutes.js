import express from 'express';
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
} from '../controllers/userController.js';
import { protect, admin, manager, inspector, driver } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(registerUser).get(protect, getUsers);
router.post('/login', authUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, getUserById)
  .put(protect, updateUser);
router.route('/:username/:role').get(getUserByUsernameAndRole);
router.route('/:username/credits')
  .get(protect, getUserCredits)
  .put(protect, updateUserCredits);
router.route('/users/:email').get(getUserByEmail);

export default router;
