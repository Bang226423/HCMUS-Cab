'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class FareSetting extends Model {
    }
    FareSetting.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        startKm: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        endKm: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        pricePerKm: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'FareSetting',
        timestamps: true
    });
    return FareSetting;
};
