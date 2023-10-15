import mongoose from 'mongoose';

const busStopSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
      },
      coordinates: {
        type: [Number],
        validate: {
          validator: function (value) {
            return value.length === 2;
          },
          message: 'Coordinates must be an array of two numbers',
        },
      },
    },
  },
  { timestamps: true }
);

const BusStop = mongoose.model('BusStop', busStopSchema);

export default BusStop;
