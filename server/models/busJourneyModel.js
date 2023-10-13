import mongoose from "mongoose";

const busJourneySchema = new mongoose.Schema(
    {
        route: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "BusRoute",
            required: true,
        },
        departureTime: {
            type: Date,
        },
        arrivalTime: {
            type: Date,
        },
        boardedUsers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "UserTrip",
            },
        ],
        state: {
            type: String,
            enum: [
                "scheduled",
                "delayed",
                "completed",
                "cancelled",
                "departed",
            ],
            default: "scheduled",
        },
        bus: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Bus",
            required: true,
        },
        driver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Driver",
            required: true,
        },
    },
    { timestamps: true }
);

busJourneySchema.index({ route: 1, departureTime: 1 }, { unique: true });

const BusJourney = mongoose.model("BusJourney", busJourneySchema);

export default BusJourney;
