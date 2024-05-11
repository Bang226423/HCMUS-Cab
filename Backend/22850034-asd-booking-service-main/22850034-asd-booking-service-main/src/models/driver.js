'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Driver extends Model {
        static associate(models) {
            Driver.belongsTo(models.Car, { foreignKey: 'carId' });

            Driver.hasMany(models.DeclinedTrip, { foreignKey: 'driverId' });
            Driver.hasMany(models.Trip, { foreignKey: 'driverId' });
            Driver.hasMany(models.DriverLocation, { foreignKey: 'driverId' });
        }
    }
    Driver.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        carId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false
        },
        licensePlateNumber: {
            type: DataTypes.STRING,
            allowNull: false
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        avatarUrl: {
            type: DataTypes.STRING,
            allowNull: true
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Driver',
        timestamps: true
    });
    return Driver;
};
