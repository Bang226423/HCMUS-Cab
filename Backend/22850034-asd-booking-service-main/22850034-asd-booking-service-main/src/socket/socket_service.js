const { sequelize } = require('../models');
const TripEvent = require('../enums/trip_event');
const driverService = require('../services/driver_service');
const tripService = require('../services/trip_service');

class SocketService {
    static async findNewDriver(socket, io, trip) {
        const selectedDriver = await driverService.findNearestDriver(trip);

        if (selectedDriver != null) {
            const newTrip = await tripService.getTripById(trip.id);
            const roomId = `DRIVER_${selectedDriver.driverId}`;
            io.to(roomId).emit(TripEvent.TRIP_DRIVER_ALLOCATE, newTrip.toJSON());
            console.log('Found a driver: ', roomId);
        }

        return selectedDriver
    }

    static async notifyAllocated(socket, trip, io) {
        socket.emit(TripEvent.TRIP_DRIVER_ALLOCATE, trip.toJSON());
    }
}

module.exports = SocketService;
