import asyncHandler from "express-async-handler";
import Bus from "../models/busModel.js";

export const createBus = asyncHandler(async (req, res) => {
    const { busNumber, capacity, type } = req.body;
    try {
        const bus = new Bus({
            busNumber,
            busCapacity: capacity,
            busType: type || "Non-AC",
        });
        const createdBus = await bus.save();
        res.status(201).json(createdBus);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
