import asyncHandler from 'express-async-handler';
import BusRoute from '../models/busRouteModel.js';

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
            { routeNumber: { $regex: term, $options: 'i' } },
            { routeName: { $regex: term, $options: 'i' } },
          ],
        },
      },
      {
        $lookup: {
          from: 'busstops',
          localField: 'stops',
          foreignField: '_id',
          as: 'results',
        },
      },
      {
        $unwind: '$results',
      },
      {
        $addFields: {
          sort: {
            $indexOfArray: ['$stops', '$results._id'],
          },
        },
      },
      {
        $sort: { _id: 1, sort: 1 },
      },
      {
        $group: {
          _id: '$_id',
          routeNumber: { $first: '$routeNumber' },
          routeName: { $first: '$routeName' },
          stops: { $push: '$results' },
          fareRate: { $first: '$fareRate' },
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
      {
        $sort: { routeNumber: 1 },
      },
      {
        $limit: 10,
      },
    ]).hint({ routeNumber: 1, routeName: 1 });

    res.status(200).json(busRoutes);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export const getBusRoutes = asyncHandler(async (req, res) => {
  try {
    const busRoutes = await BusRoute.aggregate([
      {
        $lookup: {
          from: 'busstops',
          localField: 'stops',
          foreignField: '_id',
          as: 'results',
        },
      },
      {
        $unwind: '$results',
      },
      {
        $addFields: {
          sort: {
            $indexOfArray: ['$stops', '$results._id'],
          },
        },
      },
      {
        $sort: { _id: 1, sort: 1 },
      },
      {
        $group: {
          _id: '$_id',
          routeNumber: { $first: '$routeNumber' },
          routeName: { $first: '$routeName' },
          stops: { $push: '$results' },
          fareRate: { $first: '$fareRate' },
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
      {
        $sort: { routeNumber: 1 },
      },
    ]).hint({ routeNumber: 1, routeName: 1 });

    res.status(200).json(busRoutes);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export const getBusRouteCount = asyncHandler(async (req, res) => {
  try {
    const busRouteCount = await BusRoute.countDocuments((count) => count);
    res.status(200).json(busRouteCount);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export const getBusRouteById = asyncHandler(async (req, res) => {
  try {
    const busRoute = await BusRoute.findById(req.params.id);
    if (busRoute) {
      res.status(200).json(busRoute);
    } else {
      res.status(404).json({ message: 'Bus route not found' });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export const updateBusRouteById = asyncHandler(async (req, res) => {
  const { routeNumber, routeName, stops } = req.body;
  try {
    const busRoute = await BusRoute.findById(req.params.id);
    if (busRoute) {
      busRoute.routeNumber = routeNumber;
      busRoute.routeName = routeName;
      busRoute.stops = stops;
      const updatedBusRoute = await busRoute.save();
      res.status(200).json(updatedBusRoute);
    } else {
      res.status(404).json({ message: 'Bus route not found' });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export const deleteBusRouteById = asyncHandler(async (req, res) => {
  try {
    const busRoute = await BusRoute.findByIdAndDelete(req.params.id);
    if (busRoute) {
      res.status(200).json({ message: 'Bus route removed' });
    } else {
      res.status(404).json({ message: 'Bus route not found' });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
