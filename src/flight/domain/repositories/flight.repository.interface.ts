import { Prisma } from '@prisma/client';

export interface CreateFlightRepositoryInputInterface {
  destinationId: string;
  stopNumber: number;
  nonStop: boolean;
  duration: string;
  price: number;
  flights: {
    airlineName: string;
    carrierCodeAirline: string;
    originAirport: string;
    destinationAirport: string;
    departureDate: Date;
    departureTime: Date;
    arrivalDate: Date;
    arrivalTime: Date;
    order: number;
  }[];
}

export interface CreateFlightRepositoryOutputInterface {
  id: string;
  destinationId: string;
}

export interface ListFlightByDestinationIdRepositoryInputInterface {
  destinationId: string;
  skip: number;
  limit: number;
}

export interface ListFlightByDestinationIdRepositoryOutputInterface {
  flights: {
    id: string;
    nonStop: boolean;
    price: Prisma.Decimal;
    Flight: {
      id: string;
      airlineName: string;
      departureTime: Date;
      arrivalTime: Date;
      originAirport: string;
      destinationAirport: string;
    }[];
  }[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
