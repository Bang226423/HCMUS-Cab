const BACKEND_HOST: string = process.env.NEXT_PUBLIC_BACKEND_HOST!;

interface CalculateFareResponse {
  fare: number;
}

export const fetchCalculateFare = async (
  length: number,
  tripType: string,
  tripServiceType: string
): Promise<number> => {
  try {
    const response = await fetch(`${BACKEND_HOST}/api/trips/calculate-fare`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer Test",
      },
      body: JSON.stringify({
        length,
        tripType,
        tripServiceType,
      }),
    });

    const data: CalculateFareResponse = await response.json();
    const fare: number = data.fare;
    console.log("Trip Fare:", fare);
    return fare;
  } catch (error) {
    console.error("Error calculating trip fare:", error);
    throw error;
  }
};

interface CustomerInfo {
  // Define the structure of your customer info here
}

export const fetchCustomerInfo = async (
  customerPhoneNumber: string
): Promise<CustomerInfo> => {
  try {
    const response = await fetch(
      `${BACKEND_HOST}/api/customers/search?phone=${customerPhoneNumber}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer Test",
        },
      }
    );

    const customer: CustomerInfo[] = await response.json();
    console.log("Customer:", customer[0]);
    return customer[0];
  } catch (error) {
    console.error("Error getting customer info:", error);
    throw error;
  }
};

interface CreateCustomerResponse {
  // Define the structure of your create customer response here
}

export const createCustomer = async (
  phoneNumber: string,
  name: string
): Promise<CreateCustomerResponse> => {
  try {
    const response = await fetch(`${BACKEND_HOST}/api/customers/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer Test",
      },
      body: JSON.stringify({
        phoneNumber,
        name,
      }),
    });

    const customer: CreateCustomerResponse = await response.json();
    console.log("Customer:", customer);
    return customer;
  } catch (error) {
    console.error("Error creating customer:", error);
    throw error;
  }
};

interface CreateTripResponse {
  // Define the structure of your create trip response here
}

export const createTrip = async (
  pickupLocation: any,
  dropoffLocation: any,
  customerId: string,
  tripServiceType: string,
  distance: number,
  fare: number
): Promise<CreateTripResponse> => {
  try {
    const response = await fetch(`${BACKEND_HOST}/api/trips`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer Test",
      },
      body: JSON.stringify({
        pickupLocation: pickupLocation.structured_formatting.main_text,
        pickupLocationLat: pickupLocation.location.lat,
        pickupLocationLong: pickupLocation.location.lng,
        dropoffLocation: dropoffLocation.structured_formatting.main_text,
        dropoffLocationLat: dropoffLocation.location.lat,
        dropoffLocationLong: dropoffLocation.location.lng,
        customerId,
        fare,
        distance,
        serviceTypeId: tripServiceType,
      }),
    });

    const trip: CreateTripResponse = await response.json();
    console.log("Trip:", trip);
    return trip;
  } catch (error) {
    console.error("Error creating a new trip: ", error);
    throw error;
  }
};
