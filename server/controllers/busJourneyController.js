import asyncHandler from 'express-async-handler';
import BusJourney from '../models/busJourneyModel.js';

export const createBusJourney = asyncHandler(async (req, res) => {
  const { route, departureTime, arrivalTime, bus, driver } = req.body;

  const busJourney = new BusJourney({
    route,
    departureTime,
    arrivalTime,
    bus,
    driver,
  });

  const createdBusJourney = await busJourney.save();
  res.status(201).json(createdBusJourney);
});

export const getBusJourneys = asyncHandler(async (req, res) => {
  const busJourneys = await BusJourney.find({}).populate(
    'route bus driver boardedUsers'
  );
  res.json(busJourneys);
});

export const getBusJourneyById = asyncHandler(async (req, res) => {
  const busJourney = await BusJourney.findById(req.params.id).populate(
    'route bus driver boardedUsers'
  );
  if (busJourney) res.json(busJourney);
  else {
    res.status(404);
    throw new Error('Bus Journey not found');
  }
});

export const updateBusJourney = asyncHandler(async (req, res) => {
  const { route, departureTime, arrivalTime, bus, driver } = req.body;

  const busJourney = await BusJourney.findById(req.params.id);

  if (busJourney) {
    busJourney.route = route;
    busJourney.departureTime = departureTime;
    busJourney.arrivalTime = arrivalTime;
    busJourney.bus = bus;
    busJourney.driver = driver;

    const updatedBusJourney = await busJourney.save();
    res.json(updatedBusJourney);
  } else {
    res.status(404);
    throw new Error('Bus Journey not found');
  }
});

export const deleteBusJourney = asyncHandler(async (req, res) => {
  const busJourney = await BusJourney.findById(req.params.id);

  if (busJourney) {
    await busJourney.remove();
    res.json({ message: 'Bus Journey removed' });
  } else {
    res.status(404);
    throw new Error('Bus Journey not found');
  }
});

export const boardUser = asyncHandler(async (req, res) => {
  const busJourney = await BusJourney.findById(req.params.id);

  if (busJourney) {
    busJourney.boardedUsers.push(req.body.userTrip);
    await busJourney.save();
    res.json({ message: 'User boarded' });
  } else {
    res.status(404);
    throw new Error('Bus Journey not found');
  }
});

export const departBusJourney = asyncHandler(async (req, res) => {
  const busJourney = await BusJourney.findById(req.params.id);

  if (busJourney) {
    busJourney.state = 'departed';
    await busJourney.save();
    res.json({ message: 'Bus Journey departed' });
  } else {
    res.status(404);
    throw new Error('Bus Journey not found');
  }
});

export const completeBusJourney = asyncHandler(async (req, res) => {
  const busJourney = await BusJourney.findById(req.params.id);

  if (busJourney) {
    busJourney.state = 'completed';
    await busJourney.save();
    res.json({ message: 'Bus Journey completed' });
  } else {
    res.status(404);
    throw new Error('Bus Journey not found');
  }
});

export const cancelBusJourney = asyncHandler(async (req, res) => {
  const busJourney = await BusJourney.findById(req.params.id);

  if (busJourney) {
    busJourney.state = 'cancelled';
    await busJourney.save();
    res.json({ message: 'Bus Journey cancelled' });
  } else {
    res.status(404);
    throw new Error('Bus Journey not found');
  }
});

export const delayBusJourney = asyncHandler(async (req, res) => {
  const busJourney = await BusJourney.findById(req.params.id);

  if (busJourney) {
    busJourney.state = 'delayed';
    await busJourney.save();
    res.json({ message: 'Bus Journey delayed' });
  } else {
    res.status(404);
    throw new Error('Bus Journey not found');
  }
});

export const scheduleBusJourney = asyncHandler(async (req, res) => {
  const busJourney = await BusJourney.findById(req.params.id);

  if (busJourney) {
    busJourney.state = 'scheduled';
    await busJourney.save();
    res.json({ message: 'Bus Journey scheduled' });
  } else {
    res.status(404);
    throw new Error('Bus Journey not found');
  }
});

export const getBoardedUsers = asyncHandler(async (req, res) => {
  const busJourney = await BusJourney.findById(req.params.id).populate(
    'boardedUsers'
  );

  if (busJourney) {
    res.json(busJourney.boardedUsers);
  } else {
    res.status(404);
    throw new Error('Bus Journey not found');
  }
});

export const getBusJourneysByBus = asyncHandler(async (req, res) => {
  const busJourneys = await BusJourney.find({ bus: req.params.id }).populate(
    'route bus driver boardedUsers'
  );

  if (busJourneys) {
    res.json(busJourneys);
  } else {
    res.status(404);
    throw new Error('Bus Journeys not found');
  }
});

export const getBusJourneysByDriver = asyncHandler(async (req, res) => {
  const busJourneys = await BusJourney.find({
    driver: req.params.id,
  }).populate('route bus driver boardedUsers');

  if (busJourneys) {
    res.json(busJourneys);
  } else {
    res.status(404);
    throw new Error('Bus Journeys not found');
  }
});

export const getBusJourneysByRoute = asyncHandler(async (req, res) => {
  const busJourneys = await BusJourney.find({
    route: req.params.id,
  }).populate('route bus driver boardedUsers');

  if (busJourneys) {
    res.json(busJourneys);
  } else {
    res.status(404);
    throw new Error('Bus Journeys not found');
  }
});
