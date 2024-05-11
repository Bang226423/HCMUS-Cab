export type TripStatus =
  | "submitted"
  | "allocated"
  | "arrived"
  | "driving"
  | "completed"
  | "cancelled";

export interface Location {
  location: {
    lat: number;
    lng: number;
  };
  mainText: string;
  secondaryText: string;
}

export interface Type {
  id: number;
  value: string;
}

export interface Trip {
  id: string;
  Driver: {
    id: string;
    name: string;
    licensePlateNumber: string;
    carInfo: string;
    phoneNumber: string;
    avatarUrl: string;
    Car: {
      name: string;
    };
    DriverLocations: {
      lat: number;
      long: number;
    };
  };
  Customer: {
    id: string;
    name: string;
    phoneNumber: string;
    avatarUrl: string;
    email: string;
  };
  pickupLocation: string;
  pickupLocationLat: number;
  pickupLocationLong: number;
  dropoffLocation: string;
  dropoffLocationLat: number;
  dropoffLocationLong: number;
  serviceType: Type;
  carType: Type;
  distance: number;
  status: TripStatus;
  fare: number;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
  ServiceType: {
    name: string;
    numberOfSeat: number;
  };
}
