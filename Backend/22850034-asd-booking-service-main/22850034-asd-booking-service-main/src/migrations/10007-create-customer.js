'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Customers', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            customerTypeId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'CustomerTypes',
                    key: 'id',
                },
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            phoneNumber: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            homeAddress: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            homeAddressLat: {
                type: Sequelize.DECIMAL,
                allowNull: true,
            },
            homeAddressLong: {
                type: Sequelize.DECIMAL,
                allowNull: true,
            },
            walletBalance: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            avatarUrl: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Customers');
    },
};
