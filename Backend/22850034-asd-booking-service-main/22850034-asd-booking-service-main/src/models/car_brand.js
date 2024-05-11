'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class CarBrand extends Model {
        static associate(models) {
            CarBrand.hasMany(models.Car, { foreignKey: 'carBrandId' })
        }
    }
    CarBrand.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'CarBrand',
        timestamps: true
    });
    return CarBrand;
};
