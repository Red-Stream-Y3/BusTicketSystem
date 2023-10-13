import mongoose from 'mongoose';

const userTripSchema = new mongoose.Schema({
    route: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BusRoute',
        required: true
    },
    origin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BusStop',
        required: true
    },
    destination: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BusStop',
        required: true
    },
    departureTime: {
        type: Date,
    },
    arrivalTime: {
        type: Date,
    },
    state: {
        type: String,
        enum: ['scheduled', 'delayed', 'boarded', 'completed', 'cancelled', 'missed'],
        default: 'scheduled'
    },
    bus: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bus',
    },
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Driver',
    },
});

const Trip = mongoose.model('UserTrip', userTripSchema);

export default UserTrip;