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

export const getBusRoutesBySearch = asyncHandler(async (req, res) => {
    const { term } = req.params;
    try {
        const busRoutes = await BusRoute.aggregate([
            {
                $match: {
                    $or: [
                        { routeNumber: { $regex: term, $options: "i" } },
                        { routeName: { $regex: term, $options: "i" } },
                    ],
                },
            },
            {
                $lookup: {
                    from: "busstops",
                    localField: "stops",
                    foreignField: "_id",
                    as: "stops",
                },
            },
            {
                $project: {
                    _id: 1,
                    routeNumber: 1,
                    routeName: 1,
                    stops: {
                        _id: 1,
                        name: 1,
                    },
                    fareRate: 1,
                },
            },
        ]).hint({ routeNumber: 1, routeName: 1 });

        res.status(200).json(busRoutes);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});
