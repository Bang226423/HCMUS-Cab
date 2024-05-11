'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class CustomerType extends Model {
        static associate(models) {
            CustomerType.hasMany(models.Customer, { foreignKey: 'customerTypeId' });
        }
    }
    CustomerType.init({
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
        discountPercent: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        sequelize,
        modelName: 'CustomerType',
        timestamps: true
    });
    return CustomerType;
};
