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
  }[];
};

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

export interface CreateTripRepositoryInputInterface {
  title: string;
  startDate: Date;
  endDate: Date;
  userTrips: UserTripsInterface;
  destination: DestinationInterface[];
}

export interface CreateTripRepositoryOutputInterface {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
};
