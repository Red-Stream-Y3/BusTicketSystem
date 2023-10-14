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

export const getAllBuses = asyncHandler(async (req, res) => {
  try {
    const buses = await Bus.find({});
    res.json(buses);
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
    if (bus) {
      bus.busNumber = req.body.busNumber || bus.busNumber;
      bus.busCapacity = req.body.capacity || bus.busCapacity;
      bus.busType = req.body.type || bus.busType;
      const updatedBus = await bus.save();
      res.json(updatedBus);
    } else {
      res.status(404).json({ message: "Bus not found" });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export const deleteBusById = asyncHandler(async (req, res) => {
  try {
    const bus = await Bus.findByIdAndDelete(req.params.id);
    if (bus) {
      res.json({ message: "Bus removed" });
    } else {
      res.status(404).json({ message: "Bus not found" });
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
