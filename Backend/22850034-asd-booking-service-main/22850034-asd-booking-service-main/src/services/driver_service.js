const calculateDistance = require('../utils/map_utils');
const { DriverLocation, Driver, DeclinedTrip, Trip } = require('../models');
const DriverStatus = require('../enums/driver_status');
const TripStatus = require('../enums/trip_status');
const { Sequelize, Op } = require('sequelize');

async function findNearestDriver(trip) {
    const pickupLocationLat = trip.pickupLocationLat;
    const pickupLocationLong = trip.pickupLocationLong;
    const maxDistanceInKm = 5; // Maximum distance in kilometers

    try {
        const drivers = await DriverLocation.findAll({
            attributes: ['driverId', 'lat', 'long'],
            include: [
                {
                    model: Driver,
                    attributes: ['status', 'name', 'phoneNumber', 'licensePlateNumber', 'rating', 'avatarUrl', 'carId'],
                    where: Sequelize.literal(`"Driver"."id" NOT IN (SELECT "driverId" FROM "DeclinedTrips" WHERE "tripId" = ${trip.id}) AND "Driver"."status" = ${DriverStatus.ACTIVE}`),
                },
            ],
            order: [['updatedAt', 'DESC']],
            group: ['Driver.id', 'DriverLocation.id', 'DriverLocation.driverId', 'DriverLocation.lat', 'DriverLocation.long'],
        });

        if (drivers.length > 0) {
            let nearestDriver;
            let minDistance = maxDistanceInKm;

            for (const driver of drivers) {
                const distance = calculateDistance(pickupLocationLat, pickupLocationLong, driver.lat, driver.long);
                if (distance < minDistance) {
                    minDistance = distance;
                    nearestDriver = driver;
                }
            }

            if (nearestDriver) {
                console.log('Nearest Driver within 5 km:', nearestDriver.toJSON());
            } else {
                console.log('No drivers found within 5 km.');
            }

            return nearestDriver;
        } else {
            console.log('No available drivers.');
            return null;
        }
    } catch (error) {
        console.error('Error finding nearest driver:', error.message);
        return null;
    }
}

async function getDriverById(driverId) {
    return await Driver.findByPk(driverId);
}

async function updateDriver(driverData, newLocation) {
    // Update driver information
    await Driver.update(driverData, { where: { id: driverData.id } });

    if (newLocation) {
        await DriverLocation.create({
            driverId: driverData.id,
            lat: newLocation.lat,
            long: newLocation.long,
        });
    }

    // Retrieve and return the updated driver
    const updatedDriver = await Driver.findByPk(driverData.id);
    return updatedDriver;
}

module.exports = { findNearestDriver, getDriverById, updateDriver };
