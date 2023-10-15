import mongoose from 'mongoose';

const staffScheduleSchema = new mongoose.Schema(
  {
    staff: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    shiftStart: {
      type: String,
      required: true,
    },
    shiftEnd: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const StaffSchedule = mongoose.model('StaffSchedule', staffScheduleSchema);

export default StaffSchedule;
