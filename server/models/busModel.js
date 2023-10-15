import mongoose from "mongoose";

const busSchema = new mongoose.Schema(
    {
        busNumber: {
            type: String,
            required: true,
        },
        busType: {
            type: String,
            enum: ["AC", "Non-AC"],
            required: true,
        },
        busCapacity: {
            type: Number,
            required: true,
        },
        busRoute: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "BusRoute",
        },
    },
    { timestamps: true }
);

busSchema.index({ busNumber: 1 }, { unique: true });

const Bus = mongoose.model("Bus", busSchema);

export default Bus;
