import asyncHandler from "express-async-handler";
import BusRoute from "../models/busRouteModel.js";

export const createBusRoute = asyncHandler(async (req, res) => {
    const { routeNumber, routeName, stops } = req.body;
    try {
        const busRoute = new BusRoute({
            routeNumber,
            routeName,
            stops,
        });
        const createdBusRoute = await busRoute.save();
        res.status(201).json(createdBusRoute);
    } catch (error) {
        res.status(405).json({ message: error.message });
    }
});
