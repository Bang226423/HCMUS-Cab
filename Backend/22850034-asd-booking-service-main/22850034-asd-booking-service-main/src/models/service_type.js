'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ServiceType extends Model {
        static associate(models) {
            ServiceType.hasMany(models.Trip, { foreignKey: 'serviceTypeId' });
            ServiceType.belongsToMany(models.Car, { through: models.CarServiceType, foreignKey: 'serviceTypeId', otherKey: 'carId' });
        }
    }
    ServiceType.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        surcharge: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        numberOfSeat: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'ServiceType',
        timestamps: true
    });
    return ServiceType;
};
