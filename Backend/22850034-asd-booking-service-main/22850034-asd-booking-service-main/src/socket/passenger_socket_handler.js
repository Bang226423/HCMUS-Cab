const tripService = require('../services/trip_service');
const driverService = require('../services/driver_service');
const customerService = require('../services/customer_service');
const TripStatus = require('../enums/trip_status');
const TripEvent = require('../enums/trip_event');
const SocketService = require('../socket/socket_service');

module.exports = (socket, io) => {

    /** Passenger submitted a new trip
     * 1. Create a new trip
     * 2. Find a nearest driver
     * 3. Emit a message to the driver's room based on driverId;
     */
    socket.on(TripEvent.TRIP_PASSENGER_SUBMIT, async (tripData) => {
        try {
            const newTrip = await tripService.createTrip(tripData);
            const customer = await customerService.getCustomerById(tripData.customerId);
            newTrip.customer = customer;

            const trip = await tripService.getTripById(newTrip.id);
            await socket.join(newTrip.id);
            await socket.emit(TripEvent.TRIP_PASSENGER_SUBMIT, trip.toJSON());

            await SocketService.findNewDriver(socket, io, trip);

            console.log(`[Socket]: Received a new trip ${newTrip.id}`);
            console.log(trip.toJSON());
        } catch (error) {
            console.error('Error creating trip:', error.message);
        }
    });
}
