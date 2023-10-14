import UserTrip from "../models/userTripModel.js";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import User from "../models/userModel.js";

export const createUserTrip = asyncHandler(async (req, res) => {
    const { route, origin, destination, state, fare } = req.body;
    const user = req.user._id;
    try {
        //get user's unpaid trips
        const unpaidTrips = await UserTrip.aggregate([
            {
                $match: {
                    user: new mongoose.Types.ObjectId(user),
                    paid: false,
                    state: { $ne: "cancelled" },
                },
            },
            {
                $group: {
                    _id: "$user",
                    totalFare: { $sum: "$fare" },
                },
            },
            {
                $project: {
                    _id: 0,
                    totalFare: 1,
                },
            },
        ]);

        const userCredits = await User.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(user),
                },
            },
            {
                $project: {
                    _id: 0,
                    credits: 1,
                },
            },
        ]);

        if (
            unpaidTrips[0]?.totalFare + parseInt(fare) >
            userCredits[0]?.credits
        ) {
            res.status(404);
            throw new Error(
                "Insufficient credits. You have too many unpaid trips."
            );
        }

        const trip = new UserTrip({
            route,
            origin,
            destination,
            state,
            user,
            fare,
        });
        const createdTrip = await trip.save();
        res.status(201).json(createdTrip);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

export const getUserTrips = asyncHandler(async (req, res) => {
    const user = req.user._id;
    const limit = req.params.limit || 50;

    try {
        const trips = await UserTrip.aggregate([
            {
                $match: { user: new mongoose.Types.ObjectId(user) },
            },
            {
                $lookup: {
                    from: "busstops",
                    localField: "origin",
                    foreignField: "_id",
                    as: "origin",
                },
            },
            {
                $lookup: {
                    from: "busstops",
                    localField: "destination",
                    foreignField: "_id",
                    as: "destination",
                },
            },
            {
                $lookup: {
                    from: "busroutes",
                    localField: "route",
                    foreignField: "_id",
                    as: "route",
                },
            },
            {
                $lookup: {
                    from: "buses",
                    localField: "bus",
                    foreignField: "_id",
                    as: "bus",
                },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "driver",
                    foreignField: "_id",
                    as: "driver",
                },
            },
            {
                $unwind: "$origin",
            },
            {
                $unwind: "$destination",
            },
            {
                $unwind: "$route",
            },
            {
                $unwind: {
                    path: "$bus",
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $unwind: {
                    path: "$driver",
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $project: {
                    _id: 1,
                    user: 1,
                    route: {
                        _id: 1,
                        routeName: 1,
                        routeNumber: 1,
                    },
                    origin: {
                        _id: 1,
                        name: 1,
                    },
                    destination: {
                        _id: 1,
                        name: 1,
                    },
                    fare: 1,
                    paid: 1,
                    refunded: 1,
                    departureTime: 1,
                    arrivalTime: 1,
                    state: 1,
                    bus: {
                        _id: 1,
                        busNumber: 1,
                    },
                    driver: {
                        _id: 1,
                        firstName: 1,
                        lastName: 1,
                    },
                    createdAt: 1,
                },
            },
            {
                $sort: { createdAt: -1 },
            },
            {
                $limit: parseInt(limit),
            },
        ]).hint({ user: 1, route: 1, createdAt: -1 });
        res.json(trips);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

export const getUserTripById = asyncHandler(async (req, res) => {
    const user = req.user._id;
    const id = req.params.id;

    try {
        const trip = await UserTrip.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(id),
                    user: new mongoose.Types.ObjectId(user),
                },
            },
            {
                $lookup: {
                    from: "busstops",
                    localField: "origin",
                    foreignField: "_id",
                    as: "origin",
                },
            },
            {
                $lookup: {
                    from: "busstops",
                    localField: "destination",
                    foreignField: "_id",
                    as: "destination",
                },
            },
            {
                $lookup: {
                    from: "busroutes",
                    localField: "route",
                    foreignField: "_id",
                    as: "route",
                },
            },
            {
                $lookup: {
                    from: "buses",
                    localField: "bus",
                    foreignField: "_id",
                    as: "bus",
                },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "driver",
                    foreignField: "_id",
                    as: "driver",
                },
            },
            {
                $unwind: "$origin",
            },
            {
                $unwind: "$destination",
            },
            {
                $unwind: "$route",
            },
            {
                $unwind: {
                    path: "$bus",
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $unwind: {
                    path: "$driver",
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $project: {
                    _id: 1,
                    user: 1,
                    route: {
                        _id: 1,
                        routeName: 1,
                        routeNumber: 1,
                    },
                    origin: {
                        _id: 1,
                        name: 1,
                    },
                    destination: {
                        _id: 1,
                        name: 1,
                    },
                    fare: 1,
                    paid: 1,
                    refunded: 1,
                    departureTime: 1,
                    arrivalTime: 1,
                    state: 1,
                    bus: {
                        _id: 1,
                        busNumber: 1,
                    },
                    driver: {
                        _id: 1,
                        firstName: 1,
                        lastName: 1,
                    },
                    createdAt: 1,
                },
            },
        ]).hint({ user: 1, route: 1, createdAt: -1 });
        res.json(trip);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

export const updateUserTrip = asyncHandler(async (req, res) => {
    const user = req.user._id;
    const id = req.params.id;
    const { state, bus, driver, arrivalTime, departureTime } = req.body;

    try {
        const trip = await UserTrip.findOne({
            _id: new mongoose.Types.ObjectId(id),
            user: new mongoose.Types.ObjectId(user),
        });

        if (trip) {
            trip.state = state || trip.state;
            trip.bus = bus || trip.bus;
            trip.driver = driver || trip.driver;
            trip.arrivalTime = arrivalTime || trip.arrivalTime;
            trip.departureTime = departureTime || trip.departureTime;

            const updatedTrip = await trip.save();
            res.json(updatedTrip);
        } else {
            res.status(404);
            throw new Error("Trip not found");
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});
