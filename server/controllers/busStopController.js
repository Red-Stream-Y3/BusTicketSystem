import asyncHandler from 'express-async-handler';
import BusStop from '../models/busStopModel.js';

export const createBusStop = asyncHandler(async (req, res) => {
  const { name, location } = req.body;
  const busStop = new BusStop({
    name,
    location,
  });
  const createdBusStop = await busStop.save();
  res.status(201).json(createdBusStop);
});

export const getBusStops = asyncHandler(async (req, res) => {
  const busStops = await BusStop.find({});
  res.json(busStops);
});

export const getBusStopById = asyncHandler(async (req, res) => {
  const busStop = await BusStop.findById(req.params.id);
  if (busStop) {
    res.json(busStop);
  } else {
    res.status(404);
    throw new Error('Bus stop not found');
  }
});

export const updateBusStop = asyncHandler(async (req, res) => {
  const { name, location } = req.body;
  const busStop = await BusStop.findById(req.params.id);
  if (busStop) {
    busStop.name = name;
    busStop.location = location;
    const updatedBusStop = await busStop.save();
    res.json(updatedBusStop);
  } else {
    res.status(404);
    throw new Error('Bus stop not found');
  }
});

export const deleteBusStop = asyncHandler(async (req, res) => {
  const busStop = await BusStop.findById(req.params.id);
  if (busStop) {
    await busStop.remove();
    res.json({ message: 'Bus stop removed' });
  } else {
    res.status(404);
    throw new Error('Bus stop not found');
  }
});
