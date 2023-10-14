import asyncHandler from "express-async-handler";
import BusJourney from "../models/busJourneyModel.js";
import UserTrip from "../models/userTripModel.js";
import mongoose from "mongoose";

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

export const updateBusJourney = asyncHandler(async (req, res) => {
    const { boardedUser, state } = req.body;
    const { id } = req.params;
    const driver = req.user._id; //get the driver id from the token
    try {
        const busJourney = await BusJourney.findById(id, {
            boardedUsers: 1,
            state: 1,
            bus: 1,
        });

        if (!busJourney) {
            res.status(404);
            throw new Error("Bus Journey not found");
        }

        if (boardedUser) {
            const userTrip = await UserTrip.findById(boardedUser);

            if (!userTrip) {
                res.status(404);
                throw new Error("User Trip not found");
            }

            if (
                busJourney.boardedUsers.length === 0 ||
                !busJourney.boardedUsers.includes(boardedUser)
            ) {
                busJourney.boardedUsers.push(boardedUser);
                userTrip.state = "boarded";
            } else if (
                userTrip.state === "boarded" &&
                userTrip.state !== "cancelled"
            ) {
                userTrip.state = "completed";
            }
            await busJourney.save();
            await userTrip.save();
        }
        if (state) {
            busJourney.state = state;
        }
        const updatedBusJourney = await busJourney.save();
        res.json(updatedBusJourney);
    } catch (error) {
        res.status(405).json({ message: error.message });
    }
});

export const getBusJourneys = asyncHandler(async (req, res) => {
    const busJourneys = await BusJourney.find({}).populate(
        "route bus driver boardedUsers"
    );
    res.json(busJourneys);
});

export const getBusJourneyById = asyncHandler(async (req, res) => {
    const busJourney = await BusJourney.findById(req.params.id).populate(
        "route bus driver boardedUsers"
    );
    if (busJourney) res.json(busJourney);
    else {
        res.status(404);
        throw new Error("Bus Journey not found");
    }
});

export const deleteBusJourney = asyncHandler(async (req, res) => {
    const busJourney = await BusJourney.findById(req.params.id);

    if (busJourney) {
        await busJourney.remove();
        res.json({ message: "Bus Journey removed" });
    } else {
        res.status(404);
        throw new Error("Bus Journey not found");
    }
});

// export const boardUser = asyncHandler(async (req, res) => {
//     const busJourney = await BusJourney.findById(req.params.id);

//     if (busJourney) {
//         busJourney.boardedUsers.push(req.body.userTrip);
//         await busJourney.save();
//         res.json({ message: "User boarded" });
//     } else {
//         res.status(404);
//         throw new Error("Bus Journey not found");
//     }
// });

// export const departBusJourney = asyncHandler(async (req, res) => {
//     const busJourney = await BusJourney.findById(req.params.id);

//     if (busJourney) {
//         busJourney.state = "departed";
//         await busJourney.save();
//         res.json({ message: "Bus Journey departed" });
//     } else {
//         res.status(404);
//         throw new Error("Bus Journey not found");
//     }
// });

// export const completeBusJourney = asyncHandler(async (req, res) => {
//     const busJourney = await BusJourney.findById(req.params.id);

//     if (busJourney) {
//         busJourney.state = "completed";
//         await busJourney.save();
//         res.json({ message: "Bus Journey completed" });
//     } else {
//         res.status(404);
//         throw new Error("Bus Journey not found");
//     }
// });

// export const cancelBusJourney = asyncHandler(async (req, res) => {
//     const busJourney = await BusJourney.findById(req.params.id);

//     if (busJourney) {
//         busJourney.state = "cancelled";
//         await busJourney.save();
//         res.json({ message: "Bus Journey cancelled" });
//     } else {
//         res.status(404);
//         throw new Error("Bus Journey not found");
//     }
// });

// export const delayBusJourney = asyncHandler(async (req, res) => {
//     const busJourney = await BusJourney.findById(req.params.id);

//     if (busJourney) {
//         busJourney.state = "delayed";
//         await busJourney.save();
//         res.json({ message: "Bus Journey delayed" });
//     } else {
//         res.status(404);
//         throw new Error("Bus Journey not found");
//     }
// });

// export const scheduleBusJourney = asyncHandler(async (req, res) => {
//     const busJourney = await BusJourney.findById(req.params.id);

//     if (busJourney) {
//         busJourney.state = "scheduled";
//         await busJourney.save();
//         res.json({ message: "Bus Journey scheduled" });
//     } else {
//         res.status(404);
//         throw new Error("Bus Journey not found");
//     }
// });

// export const getBoardedUsers = asyncHandler(async (req, res) => {
//     const busJourney = await BusJourney.findById(req.params.id).populate(
//         "boardedUsers"
//     );

//     if (busJourney) {
//         res.json(busJourney.boardedUsers);
//     } else {
//         res.status(404);
//         throw new Error("Bus Journey not found");
//     }
// });

// export const getBusJourneysByBus = asyncHandler(async (req, res) => {
//     const busJourneys = await BusJourney.find({ bus: req.params.id }).populate(
//         "route bus driver boardedUsers"
//     );

//     if (busJourneys) {
//         res.json(busJourneys);
//     } else {
//         res.status(404);
//         throw new Error("Bus Journeys not found");
//     }
// });

// export const getBusJourneysByDriver = asyncHandler(async (req, res) => {
//     const busJourneys = await BusJourney.find({
//         driver: req.params.id,
//     }).populate("route bus driver boardedUsers");

//     if (busJourneys) {
//         res.json(busJourneys);
//     } else {
//         res.status(404);
//         throw new Error("Bus Journeys not found");
//     }
// });

// export const getBusJourneysByRoute = asyncHandler(async (req, res) => {
//     const busJourneys = await BusJourney.find({
//         route: req.params.id,
//     }).populate("route bus driver boardedUsers");

//     if (busJourneys) {
//         res.json(busJourneys);
//     } else {
//         res.status(404);
//         throw new Error("Bus Journeys not found");
//     }
// });
