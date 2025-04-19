import { Trip } from '@prisma/client';

export interface ListTripsByUserIdRepositoryInputInterface {
  userId: string;
  title?: string;
  startDate?: Date;
  endDate?: Date;
  skip: number;
  limit: number;
}

export type ListTripsByUserIdRepositoryOutputInterface = Trip & {
  destinations: {
    id: string;
    city: string;
    state: string;
    country: string;
    startDate: Date;
    endDate: Date;
  }[];
};

export interface UserTripsInterface {
  userId: string;
}

interface DestinationInterface {
  startDate: Date;
  endDate: Date;
  city: string;
  state: string;
  country: string;
  latitude: string;
  longitude: string;
  placeId: string;
}

export interface CreateTripRepositoryInputInterface {
  title: string;
  userTrips: UserTripsInterface;
  destination: DestinationInterface[];
}

export interface CreateTripRepositoryOutputInterface {
  id: string;
  title: string;
};

export interface GetTripByUserIdRepositoryOutputInterface {
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
