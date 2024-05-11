const { sequelize } = require('../models');

class FareService {
    static calculateFare = async (tripLength, serviceTypeId) => {
        try {
            // Fetch fare settings from the database
            const fareSettings = await sequelize.models.FareSetting.findAll();
            const serviceType = await sequelize.models.ServiceType.findByPk(serviceTypeId, {
                attributes: ['surcharge'],
            });

            // Calculate total fare based on provided trip length
            let totalFare = 0;
            let remainingDistance = tripLength;

            for (const setting of fareSettings) {
                if (remainingDistance > 0) {
                    const distanceToCharge = Math.min(remainingDistance, setting.endKm - setting.startKm);
                    totalFare += distanceToCharge * setting.pricePerKm;
                    remainingDistance -= distanceToCharge;
                } else {
                    break; // Exit loop if we've covered the entire trip length
                }
            }

            return totalFare + totalFare * serviceType.surcharge / 100;
        } catch (error) {
            console.error('Error calculating trip fare:', error);
            throw error;
        }
    }
}

module.exports = FareService;
