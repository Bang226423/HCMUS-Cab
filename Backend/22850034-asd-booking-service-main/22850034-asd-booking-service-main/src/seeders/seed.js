const faker = require('faker');
const { sequelize } = require('../models');

const seedData = async () => {
    try {
        // Customer Types
        await sequelize.models.CustomerType.bulkCreate([
            { name: 'Regular', discountPercent: 0 },
            { name: 'Premium', discountPercent: 10 },
        ]);

        console.log("OK til here!")


        // Car Brands
        await sequelize.models.CarBrand.bulkCreate([
            { name: 'Toyota' },
            { name: 'Honda' },
        ]);

        // Fare Settings
        await sequelize.models.FareSetting.bulkCreate([
            { startKm: 0, endKm: 1, pricePerKm: 11000 },
            { startKm: 1, endKm: 10, pricePerKm: 10000 },
            { startKm: 10, endKm: 1000000, pricePerKm: 7000 },
        ]);

        // Service Types
        await sequelize.models.ServiceType.bulkCreate([
            { name: 'Standard', surcharge: 0, numberOfSeat: 4 },
            { name: 'Premium', surcharge: 5000, numberOfSeat: 4 },
        ]);

        // Car Service Types
        const cars = await sequelize.models.Car.findAll();
        const serviceTypes = await sequelize.models.ServiceType.findAll();

        await sequelize.models.CarServiceType.bulkCreate(
            cars.map((car, index) => ({
                carId: car.id,
                serviceTypeId: serviceTypes[index % serviceTypes.length].id,
            }))
        );


        // Customer Types
        await sequelize.models.CustomerType.bulkCreate([
            { name: 'Regular', discountPercent: 0 },
            { name: 'Premium', discountPercent: 10 },
        ]);

        // Customers
        await sequelize.models.Customer.bulkCreate(
            Array.from({ length: 5 }, () => ({
                customerTypeId: faker.random.arrayElement([1, 2]),
                name: faker.name.findName(),
                phoneNumber: faker.phone.phoneNumber(),
                email: faker.internet.email(),
                homeAddress: faker.address.streetAddress(),
                homeAddressLat: faker.address.latitude(),
                homeAddressLong: faker.address.longitude(),
                walletBalance: faker.datatype.number(),
                avatarUrl: faker.image.avatar(),
            }))
        );

        // Car Brands
        await sequelize.models.CarBrand.bulkCreate([
            { name: 'Toyota' },
            { name: 'Honda' },
        ]);

        // Cars
        const carBrands = await sequelize.models.CarBrand.findAll();
        const newCars = await sequelize.models.Car.bulkCreate(
            Array.from({ length: 5 }, (_, index) => ({
                carBrandId: carBrands[index % carBrands.length].id,
                name: faker.vehicle.model(),
                color: faker.commerce.color(),
                yearOfProduction: faker.datatype.number({ min: 2000, max: 2023 }),
                numberOfSeat: faker.datatype.number({ min: 2, max: 8 }),
            }))
        );

        // Drivers
        const drivers = await sequelize.models.Driver.bulkCreate(
            Array.from({ length: 5 }, (_, index) => ({
                carId: newCars[index % cars.length].id,
                name: faker.name.findName(),
                phoneNumber: faker.phone.phoneNumber(),
                licensePlateNumber: faker.vehicle.vin(),
                rating: faker.datatype.number({ min: 1, max: 5, precision: 0.1 }),
                avatarUrl: faker.image.avatar(),
                status: faker.random.arrayElement([1, 2, 3]),
            }))
        );


        // Locations
        await sequelize.models.DriverLocation.bulkCreate(
            drivers.map(driver => ({
                driverId: driver.id,
                lat: faker.address.latitude(),
                long: faker.address.longitude()
            }))
        );

        console.log('Seed data created successfully.');
    } catch (error) {
        console.error('Error seeding data:', error);
    } finally {
        await sequelize.close();
    }
};

seedData();
