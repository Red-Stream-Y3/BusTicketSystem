import express from 'express';
import {
  createStaffSchedule,
  getStaffSchedules,
  getStaffScheduleById,
  updateStaffSchedule,
  deleteStaffSchedule,
} from '../controllers/staffScheduleController.js';

const router = express.Router();

router.route('/').post(createStaffSchedule).get(getStaffSchedules);
router.route('/:id').get(getStaffScheduleById).put(updateStaffSchedule);
router.route('/:id').delete(deleteStaffSchedule);

export default router;
