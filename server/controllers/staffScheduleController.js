import asyncHandler from 'express-async-handler';
import StaffSchedule from '../models/staffScheduleModel.js';

export const createStaffSchedule = asyncHandler(async (req, res) => {
  const { staff, shiftStart, shiftEnd } = req.body;
  try {
    const staffSchedule = new StaffSchedule({
      staff,
      shiftStart,
      shiftEnd,
    });
    const createdStaffSchedule = await staffSchedule.save();
    res.status(201).json(createdStaffSchedule);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export const getStaffSchedules = asyncHandler(async (req, res) => {
  try {
    const staffSchedules = await StaffSchedule.find({}).populate('staff');
    res.json(staffSchedules);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export const getStaffScheduleById = asyncHandler(async (req, res) => {
  try {
    const staffSchedule = await StaffSchedule.findById(req.params.id).populate(
      'staff'
    );
    res.json(staffSchedule);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export const updateStaffSchedule = asyncHandler(async (req, res) => {
  const { staff, shiftStart, shiftEnd } = req.body;
  try {
    const staffSchedule = await StaffSchedule.findById(req.params.id);
    if (staffSchedule) {
      staffSchedule.staff = staff;
      staffSchedule.shiftStart = shiftStart;
      staffSchedule.shiftEnd = shiftEnd;

      const updatedStaffSchedule = await staffSchedule.save();
      res.json(updatedStaffSchedule);
    } else {
      res.status(404);
      throw new Error('Staff schedule not found');
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export const deleteStaffSchedule = asyncHandler(async (req, res) => {
  try {
    const staffSchedule = await StaffSchedule.findByIdAndDelete(req.params.id);
    if (staffSchedule) {
      res.json({ message: 'Staff schedule removed' });
    } else {
      res.status(404);
      throw new Error('Staff schedule not found');
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
