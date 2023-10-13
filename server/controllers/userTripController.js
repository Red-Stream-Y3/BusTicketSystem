import UserTrip from "../models/userTripModel.js";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";

export const createUserTrip = asyncHandler(async (req, res) => {
    const { route, origin, destination, state } = req.body;
    const user = req.user._id;
    try {
        const trip = new UserTrip({
            route,
            origin,
            destination,
            state,
            user,
        });
        const createdTrip = await trip.save();
        res.status(201).json(createdTrip);
    } catch (error) {
        res.status(405).json({ message: error.message });
    }
});

export const getUserTrips = asyncHandler(async (req, res) => {
    const user = req.user._id;
    const limit = req.params.limit || 30;

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
                $unwind: "$origin",
            },
            {
                $unwind: "$destination",
            },
            {
                $unwind: "$route",
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
                    departureTime: 1,
                    arrivalTime: 1,
                    state: 1,
                    bus: 1,
                    driver: 1,
                    createdAt: 1,
                },
            },
            {
                $sort: { createdAt: -1 },
            },
            {
                $limit: parseInt(limit),
            }
        ]).hint({ user: 1, route: 1, createdAt: -1 });
        res.json(trips);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});
