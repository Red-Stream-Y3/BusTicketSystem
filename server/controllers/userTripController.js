import UserTrip from "../models/userTripModel.js";
import asyncHandler from "express-async-handler";

export const createUserTrip = asyncHandler(async (req, res) => {
    const { route, origin, destination, state } = req.body;
    try {
        const trip = new UserTrip({
            route,
            origin,
            destination,
            state,
        });
        const createdTrip = await trip.save();
        res.status(201).json(createdTrip);
    } catch (error) {
        res.status(405).json({ message: error.message });
    }
});
