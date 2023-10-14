import mongoose from "mongoose";

const depotSchema = new mongoose.Schema(
  {
    depotName: {
      type: String,
      required: true,
    },
    depotLocation: {
      type: String,
      required: true,
    },
    depotManager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },
  },
  { timestamps: true }
);

const Depot = mongoose.model("Depot", depotSchema);
