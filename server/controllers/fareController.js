import asyncHandler from "express-async-handler";
import Fare from "../models/fareModel.js";

export const createFare = asyncHandler(async (req, res) => {
  const { name, amount, route } = req.body;
  try {
    const fare = new Fare({
      fareName: name,
      fareAmount: amount,
      fareRoute: route,
    });
    const createdFare = await fare.save();
    res.status(201).json(createdFare);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export const getAllFares = asyncHandler(async (req, res) => {
  try {
    const fares = await Fare.find({});
    res.json(fares);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export const getFareById = asyncHandler(async (req, res) => {
  try {
    const fare = await Fare.findById(req.params.id);
    res.json(fare);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export const getFareByFareName = asyncHandler(async (req, res) => {
  try {
    const fare = await Fare.findOne({ fareName: req.params.fareName });
    res.json(fare);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export const getFareByRoute = asyncHandler(async (req, res) => {
  try {
    const fare = await Fare.findOne({ fareRoute: req.params.fareRoute });
    res.json(fare);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export const updateFareById = asyncHandler(async (req, res) => {
  try {
    const fare = await Fare.findById(req.params.id);
    if (fare) {
      fare.fareName = req.body.fareName || fare.fareName;
      fare.fareAmount = req.body.fareAmount || fare.fareAmount;
      fare.fareRoute = req.body.fareRoute || fare.fareRoute;
      const updatedFare = await fare.save();
      res.json(updatedFare);
    } else {
      res.status(404).json({ message: "Fare not found" });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export const deleteFareById = asyncHandler(async (req, res) => {
  try {
    const fare = await Fare.findById(req.params.id);
    if (fare) {
      await fare.remove();
      res.json({ message: "Fare removed" });
    } else {
      res.status(404).json({ message: "Fare not found" });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
