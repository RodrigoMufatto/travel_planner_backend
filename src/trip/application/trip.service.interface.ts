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
    startDate: Date;
    endDate: Date;
    destinations: {
      id: string;
      city: string;
      state: string;
      country: string;
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
  city: string;
  state: string;
  country: string;
  latitude: string;
  longitude: string;
  placeId: string;
}

export interface CreateTripServiceInputInterface {
  title: string;
  startDate: string;
  endDate: string;
  userTrips: UserTripsInterface;
  destination: DestinationInterface[];
}

export interface CreateTripServiceOutputInterface {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
}
