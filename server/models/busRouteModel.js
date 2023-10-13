import mongoose from "mongoose";

const busRouteSchema = new mongoose.Schema({
    routeNumber: {
        type: String,
        required: true
    },
    routeName: {
        type: String,
        required: true
    },
    stops: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "BusStop"
    }]
});

const BusRoute = mongoose.model("BusRoute", busRouteSchema);

export default BusRoute;