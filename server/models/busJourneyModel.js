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
            ref: "User",
            required: true,
        },
        overCrowded: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

busJourneySchema.index(
    { route: 1, driver: 1, departureTime: 1 },
    { unique: true }
);

//check if the bus is over crowded every time a user boards
busJourneySchema.pre("save", async function (next) {
    if (!this.isModified("boardedUsers")) {
        next();
    }
    const journey = this;
    const bus = await this.model("Bus").findById(journey.bus);
    if (journey.boardedUsers.length > bus.capacity) {
        journey.overCrowded = true;
        await journey.save();
    }
    next();
});

//save the departure time and arrival time when state is changed
busJourneySchema.pre("save", async function (next) {
    if (this.isModified("state")) {
        const journey = this;
        if (journey.state === "departed") {
            journey.departureTime = Date.now();
        }
        if (journey.state === "completed") {
            journey.arrivalTime = Date.now();
        }
    }
    next();
});

const BusJourney = mongoose.model("BusJourney", busJourneySchema);

export default BusJourney;
