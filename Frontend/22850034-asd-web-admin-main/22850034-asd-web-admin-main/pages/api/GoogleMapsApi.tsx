import axios from "axios";

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

export const fetchDirection = async (pickup, destination) => {
  try {
    const encodedPickupPlaceId = encodeURIComponent(
      `place_id:${pickup.place_id}`
    );
    const encodedDestinationPlaceId = encodeURIComponent(
      `place_id:${destination.place_id}`
    );

    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/directions/json?key=${GOOGLE_MAPS_API_KEY}&origin=${encodedPickupPlaceId}&destination=${encodedDestinationPlaceId}`
    );

    const distance = response.data.routes[0].legs[0].distance.value;
    console.log("Trip Distance:", distance);
    return distance;
  } catch (error) {
    console.error("Error fetching directions:", error);
    throw error;
  }
};
