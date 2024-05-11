'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Customer extends Model {
        static associate(models) {
            Customer.belongsTo(models.CustomerType, { foreignKey: 'customerTypeId' });
            Customer.hasMany(models.Trip, { foreignKey: 'customerId' });
        }
    }
    Customer.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        customerTypeId: {
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
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        homeAddress: {
            type: DataTypes.STRING,
            allowNull: true
        },
        homeAddressLat: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        homeAddressLong: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        walletBalance: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        avatarUrl: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        sequelize,
        modelName: 'Customer',
        timestamps: true
    });
    return Customer;
};
