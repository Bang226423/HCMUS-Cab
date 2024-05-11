const models = require('../models'); // Adjust the path based on your project structure

const createTrip = async (tripData) => {
    try {
        const trip = await models.Trip.create(tripData, {
            include: [
                {
                    model: models.Driver,
                    attributes: ['id', 'name', 'phoneNumber', 'licensePlateNumber', 'rating', 'avatarUrl', 'status'],
                    include: [
                        {
                            model: models.DriverLocation,
                            attributes: ['lat', 'long', 'updatedAt'],
                            order: [['updatedAt', 'DESC']],
                            limit: 1,
                        },
                        {
                            model: models.Car,
                            attributes: ['name']
                        }
                    ]
                },
                {
                    model: models.Customer,
                    attributes: ['id', 'name', 'phoneNumber', 'email', 'homeAddress', 'homeAddressLat', 'homeAddressLong', 'walletBalance', 'avatarUrl'],
                },
            ],
        });
        return trip;
    } catch (error) {
        throw new Error('Error creating trip: ' + error.message);
    }
};

const getTripById = async (tripId) => {
    try {
        const trip = await models.Trip.findByPk(tripId,
            {
                include: [
                    {
                        model: models.Driver,
                        attributes: ['id', 'name', 'phoneNumber', 'licensePlateNumber', 'rating', 'avatarUrl', 'status'],
                        include: [
                            {
                                model: models.DriverLocation,
                                attributes: ['lat', 'long', 'updatedAt'],
                                order: [['updatedAt', 'DESC']],
                                limit: 1,
                            },
                            {
                                model: models.Car,
                                attributes: ['name']
                            }
                        ]
                    },
                    {
                        model: models.Customer,
                        attributes: ['id', 'name', 'phoneNumber', 'email', 'homeAddress', 'homeAddressLat', 'homeAddressLong', 'walletBalance', 'avatarUrl'],
                    },
                ],
            });
        return trip;
    } catch (error) {
        throw new Error('Error getting trip by ID: ' + error.message);
    }
};

const getAllTrips = async () => {
    try {
        const trips = await models.Trip.findAll({
            order: [['id', 'DESC']],
            include: [
                {
                    model: models.Driver,
                    attributes: ['id', 'name', 'phoneNumber', 'licensePlateNumber', 'rating', 'avatarUrl', 'status'],
                    include: [
                        {
                            model: models.DriverLocation,
                            attributes: ['lat', 'long', 'updatedAt'],
                            order: [['updatedAt', 'DESC']],
                            limit: 1,
                        },
                        {
                            model: models.Car,
                            attributes: ['name']
                        }
                    ]
                },
                {
                    model: models.Customer,
                    attributes: ['id', 'name', 'phoneNumber', 'email', 'homeAddress', 'homeAddressLat', 'homeAddressLong', 'walletBalance', 'avatarUrl'],
                },
                {
                    model: models.ServiceType,
                    attributes: ['name', 'numberOfSeat']
                }
            ],
        });
        return trips;
    } catch (error) {
        throw new Error('Error getting all trips: ' + error.message);
    }
};

const updateTrip = async (updatedTripData) => {
    try {
        const trip = await models.Trip.findByPk(updatedTripData.id);
        if (!trip) {
            throw new Error('Trip not found');
        }

        await trip.update(updatedTripData);
        return trip;
    } catch (error) {
        throw new Error('Error updating trip: ' + error.message);
    }
};

const newDeclinedTrip = async (declinedTripData) => {
    try {
        const declinedTrip = await models.DeclinedTrip.create(declinedTripData);
        return declinedTrip;
    } catch (error) {
        throw new Error('Error creating declined trip: ' + error.message);
    }
};

module.exports = {
    createTrip,
    getTripById,
    updateTrip,
    getAllTrips,
    newDeclinedTrip
};