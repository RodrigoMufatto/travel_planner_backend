export interface ListTripsByUserIdServiceInputInterface {
  userId: string;
  title?: string;
  startDate?: string;
  endDate?: string;
  page?: string;
  limit?: string;
}

export interface ListTripsByUserIdServiceOutputInterface {
  trips: {
    id: string;
    title: string;
    destinations: {
      id: string;
      city: string;
      state: string;
      country: string;
      startDate: Date;
      endDate: Date;
    }[];
  }[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface UserTripsInterface {
  userId: string;
}

interface DestinationInterface {
  startDate: string;
  endDate: string;
  city: string;
  state: string;
  country: string;
  latitude: string;
  longitude: string;
  placeId: string;
}

export interface CreateTripServiceInputInterface {
  title: string;
  userTrips: UserTripsInterface;
  destination: DestinationInterface[];
}

export interface CreateTripServiceOutputInterface {
  id: string;
  title: string;
}

export interface GetTripByUserIdServiceOutputInterface {
  title: string;
  id: string;
  destinations: {
    id: string;
    startDate: Date;
    endDate: Date;
    city: string;
    country: string;
    latitude: string;
    longitude: string;
  }[];
}
