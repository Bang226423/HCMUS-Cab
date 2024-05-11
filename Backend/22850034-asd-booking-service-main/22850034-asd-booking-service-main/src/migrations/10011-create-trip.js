'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Trips', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            customerId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            driverId: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            serviceTypeId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            status: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
            },
            pickupLocation: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            pickupLocationLat: {
                type: Sequelize.DOUBLE,
                allowNull: true,
            },
            pickupLocationLong: {
                type: Sequelize.DOUBLE,
                allowNull: true,
            },
            dropoffLocationLat: {
                type: Sequelize.DOUBLE,
                allowNull: false,
            },
            dropoffLocationLong: {
                type: Sequelize.DOUBLE,
                allowNull: false,
            },
            dropoffLocation: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            startTime: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            endTime: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            fare: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            distance: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            rating: {
                type: Sequelize.INTEGER,
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
        await queryInterface.dropTable('Trips');
    },
};
