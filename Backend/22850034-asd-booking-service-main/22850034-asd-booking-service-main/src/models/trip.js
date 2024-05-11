'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Trip extends Model {
        static associate(models) {
            Trip.belongsTo(models.Driver, { foreignKey: 'driverId' });
            Trip.belongsTo(models.Customer, { foreignKey: 'customerId' });
            Trip.belongsTo(models.ServiceType, { foreignKey: 'serviceTypeId' });
            Trip.hasMany(models.DeclinedTrip, { foreignKey: 'tripId' });
        }
    }
    Trip.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        customerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        driverId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        serviceTypeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        status: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        pickupLocation: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        pickupLocationLat: {
            type: DataTypes.DOUBLE,
            allowNull: true,
        },
        pickupLocationLong: {
            type: DataTypes.DOUBLE,
            allowNull: true,
        },
        dropoffLocationLat: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        dropoffLocationLong: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        dropoffLocation: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        startTime: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        endTime: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        fare: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        distance: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    }, {
        sequelize,
        modelName: 'Trip',
        timestamps: true
    });
    return Trip;
};
