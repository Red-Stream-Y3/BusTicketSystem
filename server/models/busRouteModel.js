import mongoose from "mongoose";

const busRouteSchema = new mongoose.Schema(
    {
        routeNumber: {
            type: String,
            required: true,
        },
        routeName: {
            type: String,
            required: true,
        },
        stops: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "BusStop",
            required: true,
        },
        fareRate: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    { timestamps: true }
);

busRouteSchema.index({ routeNumber: 1, routeName: 1 }, { unique: true });

const BusRoute = mongoose.model("BusRoute", busRouteSchema);

export default BusRoute;
