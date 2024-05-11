'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class CarServiceType extends Model {
        static associate(models) {
            CarServiceType.belongsTo(models.Car, { foreignKey: 'carId' });
            CarServiceType.belongsTo(models.ServiceType, { foreignKey: 'serviceTypeId' });
        }
    }
    CarServiceType.init({
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
        serviceTypeId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'CarServiceType',
        timestamps: true
    });
    return CarServiceType;
};
