import asyncHandler from "express-async-handler";
import Depot from "../models/depotModel.js";

export const createDepot = asyncHandler(async (req, res) => {
  const { depotName, depotLocation, depotManager } = req.body;
  try {
    const depot = new Depot({
      depotName,
      depotLocation,
      depotManager,
    });
    const createdDepot = await depot.save();
    res.status(201).json(createdDepot);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export const getAllDepots = asyncHandler(async (req, res) => {
  try {
    const depots = await Depot.find({});
    res.json(depots);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export const getDepotById = asyncHandler(async (req, res) => {
  try {
    const depot = await Depot.findById(req.params.id);
    res.json(depot);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export const getDepotByDepotName = asyncHandler(async (req, res) => {
  try {
    const depot = await Depot.findOne({ depotName: req.params.depotName });
    res.json(depot);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export const updateDepotById = asyncHandler(async (req, res) => {
  try {
    const depot = await Depot.findById(req.params.id);
    if (depot) {
      depot.depotName = req.body.depotName || depot.depotName;
      depot.depotLocation = req.body.depotLocation || depot.depotLocation;
      depot.depotManager = req.body.depotManager || depot.depotManager;
      const updatedDepot = await depot.save();
      res.json(updatedDepot);
    } else {
      res.status(404).json({ message: "Depot not found" });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export const deleteDepotById = asyncHandler(async (req, res) => {
  try {
    const depot = await Depot.findById(req.params.id);
    if (depot) {
      await depot.remove();
      res.json({ message: "Depot removed" });
    } else {
      res.status(404).json({ message: "Depot not found" });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
