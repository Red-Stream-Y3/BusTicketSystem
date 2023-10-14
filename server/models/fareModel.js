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
    fareRoute: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BusRoute",
    },
  },
  { timestamps: true }
);

const Fare = mongoose.model("Fare", fareSchema);
