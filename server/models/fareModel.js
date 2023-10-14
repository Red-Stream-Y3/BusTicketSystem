import mongoose from "mongoose";

const fareSchema = new mongoose.Schema(
  {
    fareName: {
      type: String,
      required: true,
    },
    fareAmount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Fare = mongoose.model("Fare", fareSchema);

export default Fare;
