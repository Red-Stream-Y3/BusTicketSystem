import mongoose from "mongoose";

const userTripSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        route: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "BusRoute",
            required: true,
        },
        origin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "BusStop",
            required: true,
        },
        destination: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "BusStop",
            required: true,
        },
        departureTime: {
            type: Date,
        },
        arrivalTime: {
            type: Date,
        },
        state: {
            type: String,
            enum: [
                "scheduled",
                "delayed",
                "boarded",
                "completed",
                "cancelled",
                "missed",
            ],
            default: "scheduled",
            required: true,
        },
        bus: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Bus",
        },
        driver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Driver",
        },
    },
    { timestamps: true }
);

userTripSchema.index({ user: 1, route: 1, createdAt: -1 });

const UserTrip = mongoose.model("UserTrip", userTripSchema);

export default UserTrip;
