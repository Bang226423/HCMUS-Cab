const tripService = require('../services/trip_service');
const driverService = require('../services/driver_service');
const TripStatus = require('../enums/trip_status');
const TripEvent = require('../enums/trip_event');
const DriverStatus = require('../enums/driver_status');
const SocketService = require('../socket/socket_service');
const SmsService = require('../services/sms_service');

module.exports = (socket, io) => {

    socket.on(TripEvent.DRIVER_ACTIVE, async (driverData) => {
        await driverService.updateDriver({
            id: driverData.id,
            status: DriverStatus.ACTIVE,
        }, driverData.DriverLocations);
        const roomId = `DRIVER_${driverData.id}`;
        await socket.join(roomId);

        console.log(`Driver ${driverData.id} active successfully! Joined room: ${roomId}`);
    });

    socket.on(TripEvent.DRIVER_CANCEL, async (driverData) => {
        await driverService.updateDriver({
            id: driverData.id,
            status: DriverStatus.INACTIVE,
        }, driverData.driverLocation);
        const roomId = `DRIVER_${driverData.id}`;
        await socket.leave(roomId);

        console.log(`Driver ${driverData.id} inactive successfully!`);
    });

    socket.on(TripEvent.TRIP_DRIVER_ACCEPT, async (tripData) => {
        console.log("TRIP_DRIVER_ACCEPT: ", tripData);
        try {
            await driverService.updateDriver({
                id: tripData.driver.id,
                // status: DriverStatus.ON_TRIP
            }, tripData.driverLocation);

            let trip = await tripService.updateTrip({
                id: tripData.id,
                status: TripStatus.ALLOCATED,
                driverId: tripData.driver.id
            });


            trip = await tripService.getTripById(trip.id);
            await io.to(trip.id).emit(TripEvent.TRIP_DRIVER_ALLOCATE, trip.toJSON());

            // Send SMS to customer
            const driver = trip.Driver;
            if (driver != null) {
                const message = `Da co Tai xe. Ten TX: ${driver.name}, SDT: ${driver.phoneNumber}, Bien So: ${driver.licensePlateNumber}`;
                SmsService.sendSmsNotification(customer.phoneNumber
                    , message);
            }

            console.log('TRIP_DRIVER_ALLOCATE', trip.toJSON());
        } catch (error) {
            console.error('Error updating trip:', error.message);
        }
    });

    socket.on(TripEvent.TRIP_DRIVER_DECLINE, async (tripData) => {
        console.log("TRIP_DRIVER_DECLINE: ", tripData);
        try {
            await tripService.newDeclinedTrip({
                tripId: tripData.id,
                driverId: tripData.driver.id,
            });

            const trip = await tripService.getTripById(tripData.id);
            await SocketService.findNewDriver(socket, io, trip);

            console.log('TRIP_DRIVER_DECLINE', tripData);
        } catch (error) {
            console.error('Error declining trip:', error.message);
        }
    });

    socket.on(TripEvent.TRIP_DRIVER_ARRIVED, async (tripData) => {
        try {
            await driverService.updateDriver({
                id: tripData.driver.id,
            }, tripData.driver.driverLocation);

            let trip = await tripService.updateTrip({
                id: tripData.id,
                status: TripStatus.DRIVING
            });

            trip = await tripService.getTripById(trip.id);
            io.to(tripData.id).emit(TripEvent.TRIP_DRIVER_ARRIVED, trip.toJSON());
            console.log('Driver has arrived!')
        } catch (error) {
            console.error('ARRIVED: Error updating trip:', error.message);
        }
    });

    socket.on(TripEvent.TRIP_DRIVER_DRIVING, async (tripData) => {
        try {
            await driverService.updateDriver({
                id: tripData.driver.id,
                // status: DriverStatus.ON_TRIP
            }, tripData.driver.driverLocation);

            let trip = await tripService.updateTrip({
                id: tripData.id,
                status: TripStatus.ALLOCATED,
                driverId: tripData.driver.id
            });

            trip = await tripService.getTripById(trip.id);
            await io.to(trip.id).emit(TripEvent.TRIP_DRIVER_DRIVING, trip.toJSON());
        } catch (error) {
            console.error('ARRIVED: Error updating trip:', error.message);
        }
    });

    socket.on(TripEvent.TRIP_DRIVER_COMPLETED, async (tripData) => {
        try {
            await driverService.updateDriver({
                id: tripData.driver.id,
            }, tripData.driver.driverLocation);

            let trip = await tripService.updateTrip({
                id: tripData.id,
                status: TripStatus.COMPLETED
            });

            trip = await tripService.getTripById(trip.id);
            io.to(tripData.id).emit(TripEvent.TRIP_DRIVER_COMPLETED, trip.toJSON());
            console.log('Driver has completed!')
        } catch (error) {
            console.error('COMPLETED: Error updating trip:', error.message);
        }
    });

};
