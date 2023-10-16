import asyncHandler from "express-async-handler";
import BusJourney from "../models/busJourneyModel.js";
import UserTrip from "../models/userTripModel.js";
import { mongoose } from "mongoose";

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
            route: 1,
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

            if (userTrip.state === "cancelled") {
                res.status(400);
                throw new Error("User Trip is cancelled");
            }

            if (userTrip.state === "completed") {
                res.status(400);
                throw new Error("User Trip is completed");
            }

            if (userTrip.route.toString() !== busJourney.route.toString()) {
                res.status(400);
                throw new Error("User Trip is not for this route");
            }

            if (userTrip.state === "scheduled") {
                userTrip.state = "boarded";
                userTrip.bus = busJourney.bus;
                userTrip.driver = driver;
            } else if (userTrip.state === "boarded") {
                userTrip.state = "completed";
            }

            if (!busJourney.boardedUsers.includes(boardedUser)) {
                busJourney.boardedUsers.push(boardedUser);
            }

            await busJourney.save();
            await userTrip.save();
        }
        if (state) {
            busJourney.state = state;
          
    if (boardedUser) {
      const userTrip = await UserTrip.findById(boardedUser);

      if (!userTrip) {
        res.status(404);
        throw new Error("User Trip not found");
      }

      if (userTrip.state === "cancelled") {
        res.status(400);
        throw new Error("User Trip is cancelled");
      }

      if (userTrip.state === "completed") {
        res.status(400);
        throw new Error("User Trip is completed");
      }

      if (userTrip.route.toString() !== busJourney.route.toString()) {
        res.status(400);
        throw new Error("User Trip is not for this route");
      }

      if (userTrip.state === "scheduled") {
        userTrip.state = "boarded";
        userTrip.bus = busJourney.bus;
        userTrip.driver = driver;
      } else if (userTrip.state === "boarded") {
        userTrip.state = "completed";
      }

      if (!busJourney.boardedUsers.includes(boardedUser)) {
        busJourney.boardedUsers.push(boardedUser);
      }

      console.log("busJourney", userTrip.state);

      await busJourney.save();
      await userTrip.save();
    }
    if (state) {
      busJourney.state = state;

      if (state === "completed" || state === "cancelled") {
        busJourney.boardedUsers.forEach(async (userTripId) => {
          const userTrip = await UserTrip.findById(userTripId);
          if (userTrip.state !== "completed") {
            userTrip.state = "cancelled";
          }
          await userTrip.save();
        });
      }
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
  console.log("busJourneys", busJourneys);
  res.json(busJourneys);
});

export const getBusJourneyById = asyncHandler(async (req, res) => {
  const busJourney = await BusJourney.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(req.params.id),
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
        from: "busroutes",
        localField: "route",
        foreignField: "_id",
        as: "route",
      },
    },
    {
      $lookup: {
        from: "usertrips",
        localField: "boardedUsers",
        foreignField: "_id",
        as: "boardedUsers",
      },
    },
    {
      $unwind: "$bus",
    },
    {
      $unwind: "$route",
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
    {
      $project: {
        _id: 1,
        route: {
          _id: 1,
          routeNumber: 1,
          routeName: 1,
        },
        state: 1,
        bus: {
          _id: 1,
          busNumber: 1,
          busType: 1,
          busCapacity: 1,
        },
        departureTime: 1,
        arrivalTime: 1,
        boardedUsers: {
          _id: 1,
          state: 1,
        },
        createdAt: 1,
      },
    },
  ]);

  if (busJourney) res.json(busJourney[0]);
  else {
    res.status(404);
    throw new Error("Bus Journey not found");
  }
});

export const deleteBusJourney = asyncHandler(async (req, res) => {
  const busJourney = await BusJourney.findByIdAndDelete(req.params.id);

  if (busJourney) {
    res.json({ message: "Bus Journey removed" });
  } else {
    res.status(404);
    throw new Error("Bus Journey not found");
  }
});

export const getBusJourneyByUser = asyncHandler(async (req, res) => {
  const user = req.user._id;
  const limit = parseInt(req.params.limit) || 10;

  try {
    const busJourneys = await BusJourney.aggregate([
      {
        $match: {
          driver: user,
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
          from: "busroutes",
          localField: "route",
          foreignField: "_id",
          as: "route",
        },
      },
      {
        $lookup: {
          from: "usertrips",
          localField: "boardedUsers",
          foreignField: "_id",
          as: "boardedUsers",
        },
      },
      {
        $unwind: "$bus",
      },
      {
        $unwind: "$route",
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $project: {
          _id: 1,
          route: {
            _id: 1,
            routeNumber: 1,
            routeName: 1,
          },
          state: 1,
          bus: {
            _id: 1,
            busNumber: 1,
            busType: 1,
            busCapacity: 1,
          },
          departureTime: 1,
          arrivalTime: 1,
          boardedUsers: {
            _id: 1,
            state: 1,
          },
          createdAt: 1,
        },
      },
      {
        $limit: limit,
      },
    ]);

    res.json(busJourneys);
  } catch (error) {
    res.status(405).json({ message: error.message });
  }
});

export const scheduleBusJourney = asyncHandler(async (req, res) => {
  const {
    bus,
    route,
    state,
    departureTime,
    arrivalTime,
    boardedUsers,
    driver,
  } = req.body;

  try {
    const busJourney = new BusJourney({
      bus,
      route,
      state,
      departureTime,
      arrivalTime,
      boardedUsers,
      driver,
    });
    const createdBusJourney = await busJourney.save();
    res.status(201).json(createdBusJourney);
  } catch (error) {
    console.log("dad");
    res.json({ message: error.message });
  }
});

export const updateScheduleJourney = asyncHandler(async (req, res) => {
  const {
    bus,
    route,
    state,
    departureTime,
    arrivalTime,
    boardedUsers,
    driver,
  } = req.body;

  try {
    const busJourney = await BusJourney.findById(req.params.id);
    if (busJourney) {
      busJourney.bus = bus;
      busJourney.route = route;
      busJourney.state = state;
      busJourney.departureTime = departureTime;
      busJourney.arrivalTime = arrivalTime;
      busJourney.boardedUsers = boardedUsers;
      busJourney.driver = driver;
      const updatedBusJourney = await busJourney.save();
      res.json(updatedBusJourney);
    } else {
      res.status(404);
      throw new Error("Bus Journey not found");
    }
  } catch (error) {
    res.status(405).json({ message: error.message });
  }
});

export const getBusJourneyByUser = asyncHandler(async (req, res) => {
    const user = req.user._id;
    const limit = parseInt(req.params.limit) || 10;

    try {
        const busJourneys = await BusJourney.aggregate([
            {
                $match: {
                    driver: user,
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
                    from: "busroutes",
                    localField: "route",
                    foreignField: "_id",
                    as: "route",
                },
            },
            {
                $lookup: {
                    from: "usertrips",
                    localField: "boardedUsers",
                    foreignField: "_id",
                    as: "boardedUsers",
                },
            },
            {
                $unwind: "$bus",
            },
            {
                $unwind: "$route",
            },
            {
                $sort: {
                    createdAt: -1,
                },
            },
            {
                $project: {
                    _id: 1,
                    route: {
                        _id: 1,
                        routeNumber: 1,
                        routeName: 1,
                    },
                    state: 1,
                    bus: {
                        _id: 1,
                        busNumber: 1,
                        busType: 1,
                        busCapacity: 1,
                    },
                    departureTime: 1,
                    arrivalTime: 1,
                    boardedUsers: {
                        _id: 1,
                        state: 1,
                    },
                    createdAt: 1,
                },
      },
      {
        $limit: limit,
      },
    ]);

    res.json(busJourneys);
  } catch (error) {
    res.status(405).json({ message: error.message });
  }
});

export const getDepartedJourneys = asyncHandler(async (req, res) => {
  try {
    const busJourneys = await BusJourney.aggregate([
      {
        $match: {
          state: "departed",
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
          from: "busroutes",
          localField: "route",
          foreignField: "_id",
          as: "route",
        },
      },
      {
        $unwind: "$bus",
      },
      {
        $unwind: "$route",
      },
      {
        $project: {
          _id: 1,
          routeNumber: "$route.routeNumber",
          routeName: "$route.routeName",
          busNumber: "$bus.busNumber",
          busCapacity: "$bus.busCapacity",
          departureTime: {
            $dateToString: {
              format: "%Y-%m-%d %H:%M:%S",
              date: "$departureTime",
              timezone: "Asia/Colombo",
            },
          },
          overCrowded: {
            $cond: {
              if: {
                $gt: [
                  {
                    $size: "$boardedUsers",
                  },
                  "$bus.busCapacity",
                ],
              },
              then: "Over Crowded",
              else: "Not Over Crowded",
            },
          },
        },
      },
    ]);
    const rearrangedBusJourneys = busJourneys.map((journey) => ({
      _id: journey._id,
      routeNumber: journey.routeNumber,
      routeName: journey.routeName,
      busNumber: journey.busNumber,
      busCapacity: journey.busCapacity,
      departureTime: journey.departureTime,
      overCrowded: journey.overCrowded,
    }));
    res.json(rearrangedBusJourneys);
  } catch (error) {
    res.status(405).json({ message: error.message });
  }
});

export const getAllBusJourneys = asyncHandler(async (req, res) => {
  try {
    const busJourneys = await BusJourney.aggregate([
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
          from: "busroutes",
          localField: "route",
          foreignField: "_id",
          as: "route",
        },
      },
      {
        $lookup: {
          from: "usertrips",
          localField: "boardedUsers",
          foreignField: "_id",
          as: "boardedUsers",
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
        $unwind: "$bus",
      },
      {
        $unwind: "$route",
      },
      {
        $unwind: "$driver",
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $project: {
          _id: 1,
          routeNumber: "$route.routeNumber",
          departureTime: {
            $dateToString: {
              format: "%Y-%m-%d %H:%M:%S",
              date: "$departureTime",
              timezone: "Asia/Colombo",
            },
          },
          arrivalTime: {
            $dateToString: {
              format: "%Y-%m-%d %H:%M:%S",
              date: "$arrivalTime",
              timezone: "Asia/Colombo",
            },
          },
          busNumber: "$bus.busNumber",
          driverName: "$driver.name",
          passengers: {
            $size: "$boardedUsers",
          },
          state: 1,
        },
      },
    ]);

    const rearrangedBusJourneys = busJourneys.map((journey) => ({
      _id: journey._id,
      routeNumber: journey.routeNumber,
      departureTime: journey.departureTime,
      arrivalTime: journey.arrivalTime,
      busNumber: journey.busNumber,
      driverName: journey.driverName,
      passengers: journey.passengers,
      state: journey.state,
    }));
    res.json(rearrangedBusJourneys);
  } catch (error) {
    res.status(405).json({ message: error.message });
  }
});
