import asyncHandler from "express-async-handler";
import BusJourney from "../models/busJourneyModel.js";

export const createBusJourney = asyncHandler(async (req, res) => {
    const { bus, route, state } = req.body;
    const driver = req.user._id; //get the driver id from the token
    try {
        const busJourney = new BusJourney({
            bus,
            driver,
            route,
            state,
        });
        const createdBusJourney = await busJourney.save();
        res.status(201).json(createdBusJourney);
    } catch (error) {
        res.status(405).json({ message: error.message });
    }
});