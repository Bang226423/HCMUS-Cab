'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class DeclinedTrip extends Model {
        static associate(models) {
            DeclinedTrip.belongsTo(models.Trip, { foreignKey: 'tripId' });
            DeclinedTrip.belongsTo(models.Driver, { foreignKey: 'driverId' });
        }
    }
    DeclinedTrip.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        driverId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        tripId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: 'DeclinedTrip',
        timestamps: true
    });
    return DeclinedTrip;
};
