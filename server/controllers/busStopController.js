import asyncHandler from "express-async-handler";
import BusStop from "../models/busStopModel.js";

export const createBusStop = asyncHandler(async (req, res) => {
    const { name, location } = req.body;
    try {
        const busStop = new BusStop({
            name,
            location,
        });
        const createdBusStop = await busStop.save();
        res.status(201).json(createdBusStop);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
