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
        busJourney: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "BusJourney",
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
        fare: {
            type: Number,
            required: true,
        },
        paid: {
            type: Boolean,
            default: false,
            required: true,
        },
        refunded: {
            type: Boolean,
            default: false,
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

//check if user has enough credits before creating
userTripSchema.pre("save", async function (next) {
    if (this.isNew) {
        const user = await this.model("User").findById(this.user);
        if (user.credits < this.fare) {
            throw new Error("Insufficient credits");
        }
    }
    next();
});

//if state is updated to boarded, then deduct the fare from the user's credits
userTripSchema.pre("save", async function (next) {
    if (this.isModified("state")) {
        if (this.state === "boarded" && !this.paid) {
            this.paid = true;
            await this.model("User").findByIdAndUpdate(this.user, {
                $inc: { credits: -this.fare },
            });
        }
    }
    next();
});

//if state is updated to cancelled/missed, then refund the user
userTripSchema.pre("save", async function (next) {
    if (this.isModified("state")) {
        if (
            (this.state === "cancelled" || this.state === "missed") &&
            this.paid &&
            !this.refunded
        ) {
            this.refunded = true;
            await this.model("User").findByIdAndUpdate(this.user, {
                $inc: { credits: this.fare },
            });
        }
    }
    next();
});

const UserTrip = mongoose.model("UserTrip", userTripSchema);

export default UserTrip;
