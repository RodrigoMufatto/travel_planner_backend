import { Prisma } from "@prisma/client";

export interface CreateFlightServiceInputInterface {
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
    departureDate: string;
    departureTime: string;
    arrivalDate: string;
    arrivalTime: string;
    order: number;
  }[];
}

export interface CreateFlightServiceOutputInterface {
  id: string;
  destinationId: string;
}

export interface ListFlightByDestinationIdInputInterface {
  destinationId: string;
  page?: string;
  limit?: string;
}

export interface ListFlightByDestinationIdOutputInterface {
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
