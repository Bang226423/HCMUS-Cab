'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Car extends Model {
        static associate(models) {
            Car.belongsTo(models.CarBrand, { foreignKey: 'carBrandId' });
            Car.belongsToMany(models.ServiceType, { through: models.CarServiceType, foreignKey: 'carId', otherKey: 'serviceTypeId' });
            Car.hasMany(models.Driver, { foreignKey: 'carId' });
        }
    }
    Car.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        carBrandId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        color: {
            type: DataTypes.STRING,
            allowNull: false
        },
        yearOfProduction: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        numberOfSeat: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Car',
        timestamps: true
    });
    return Car;
};
