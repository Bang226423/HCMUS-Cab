'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Users', [
            {
                phoneNumber: '0938922612',
                password: '$2b$10$asNh1Pj7vcLdnFVZqSOEpu22uLKL9qasCseBIxSpLArMJaRObEsny',
                name: 'Cao Hoai Viet',
                email: 'viet.ch2612@gmail.com',
                createdAt: new Date(),
                updatedAt: new Date(),
                userType: 'customer',
            },
            {
                phoneNumber: '0938922613',
                password: '$2b$10$asNh1Pj7vcLdnFVZqSOEpu22uLKL9qasCseBIxSpLArMJaRObEsny',
                name: 'Hoai Viet Driver',
                email: 'viet.ch2613@gmail.com',
                createdAt: new Date(),
                updatedAt: new Date(),
                userType: 'driver',
            }
            // Add more user entries as needed
        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Users', null, {});
    }
};