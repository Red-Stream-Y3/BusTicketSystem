import asyncHandler from 'express-async-handler';
import Bus from '../models/busModel.js';

// @desc    Create a bus
// @route   POST /api/buses
// @access  Private/Admin
export const createBus = asyncHandler(async (req, res) => {
  const { busNumber, busCapacity, busType, busRoute } = req.body;
  try {
    const bus = new Bus({
      busNumber,
      busCapacity,
      busType,
      busRoute,
    });
    const createdBus = await bus.save();
    res.status(201).json(createdBus);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Get all buses
// @route   GET /api/buses
// @access  Public
export const getAllBuses = asyncHandler(async (req, res) => {
  // only _id, busNumber, busCapacity, busType, busRouteNumber, busRouteName
  try {
    const buses = await Bus.find({}).populate(
      'busRoute',
      'routeNumber routeName'
    );
    const busesIdNumberCapacityTypeRouteNumberRouteName = buses.map((bus) => {
      return {
        _id: bus._id,
        busNumber: bus.busNumber,
        busCapacity: bus.busCapacity,
        busType: bus.busType,
        busRouteNumber: bus.busRoute ? bus.busRoute.routeNumber : null,
        busRouteName: bus.busRoute ? bus.busRoute.routeName : null,
      };
    });
    res.json(busesIdNumberCapacityTypeRouteNumberRouteName);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export const getBusById = asyncHandler(async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id);
    res.json(bus);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export const getBusByBusNumber = asyncHandler(async (req, res) => {
  try {
    const bus = await Bus.findOne({ busNumber: req.params.busNumber });
    res.json(bus);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export const updateBusById = asyncHandler(async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id);
    console.log('bus: ', req.body);
    if (bus) {
      bus.busNumber = req.body.busNumber || bus.busNumber;
      bus.busCapacity = req.body.busCapacity || bus.busCapacity;
      bus.busType = req.body.busType || bus.busType;
      bus.busRoute = req.body.busRoute || bus.busRoute;
      const updatedBus = await bus.save();
      console.log('updatedBus: ', updatedBus);
      res.json(updatedBus);
    } else {
      res.status(404).json({ message: 'Bus not found' });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export const deleteBusById = asyncHandler(async (req, res) => {
  try {
    const bus = await Bus.findByIdAndDelete(req.params.id);
    if (bus) {
      res.json({ message: 'Bus removed' });
    } else {
      res.status(404).json({ message: 'Bus not found' });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export const getBusCount = asyncHandler(async (req, res) => {
  try {
    const busCount = await Bus.countDocuments((count) => count);
    res.json({ busCount });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export const getBusesByType = asyncHandler(async (req, res) => {
  try {
    const buses = await Bus.find({ busType: req.params.type });
    res.json(buses);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export const getBusesByCapacity = asyncHandler(async (req, res) => {
  try {
    const buses = await Bus.find({ busCapacity: req.params.capacity });
    res.json(buses);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export const getBusesByRoute = asyncHandler(async (req, res) => {
  try {
    const buses = await Bus.find({ busRoute: req.params.routeId });
    res.json(buses);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export const getBusesByRouteAndType = asyncHandler(async (req, res) => {
  try {
    const buses = await Bus.find({
      busRoute: req.params.routeId,
      busType: req.params.type,
    });
    res.json(buses);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export const getBusBySearch = asyncHandler(async (req, res) => {
  const { searchterm } = req.params;
  try {
    const buses = await Bus.aggregate([
      {
        $match: {
          busNumber: {
            $regex: searchterm,
            $options: 'i',
          },
        },
      },
      {
        $lookup: {
          from: 'busroutes',
          localField: 'busRoute',
          foreignField: '_id',
          as: 'busRoute',
        },
      },
      {
        $unwind: '$busRoute',
      },
      {
        $project: {
          _id: 1,
          busNumber: 1,
          busType: 1,
          busCapacity: 1,
          busRoute: {
            _id: 1,
            routeNumber: 1,
            routeName: 1,
          },
        },
      },
    ]);

    res.json(buses);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
