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
  },
  { timestamps: true }
);

const Depot = mongoose.model("Depot", depotSchema);

export default Depot;
