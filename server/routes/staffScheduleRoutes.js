import express from 'express';
import {
  createStaffSchedule,
  getStaffSchedules,
  getStaffScheduleById,
  updateStaffSchedule,
} from '../controllers/staffScheduleController.js';

const router = express.Router();

router.route('/').post(createStaffSchedule).get(getStaffSchedules);
router.route('/:id').get(getStaffScheduleById).put(updateStaffSchedule);

export default router;
