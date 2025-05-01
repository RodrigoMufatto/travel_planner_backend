import {
  CreateFlightServiceOutputInterface,
  ListFlightByDestinationIdOutputInterface,
} from '../application/flight.service.interface';

export class CreateFlightPresenter {
  id: string;
  destinationId: string;

  constructor(flight: CreateFlightServiceOutputInterface) {
    this.id = flight.id;
    this.destinationId = flight.destinationId;
  }
}

export class ListFlightByDestinationIdPresenter {
  flights: {
    id: string;
    nonStop: boolean;
    price: number;
    flightInformation: {
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

  constructor(output: ListFlightByDestinationIdOutputInterface) {
    this.flights = output.flights.map((item) => ({
      id: item.id,
      nonStop: item.nonStop,
      price: Number(item.price),
      flightInformation: item.Flight.map((flight) => ({
        id: flight.id,
        airlineName: flight.airlineName,
        departureTime: flight.departureTime,
        arrivalTime: flight.arrivalTime,
        originAirport: flight.originAirport,
        destinationAirport: flight.destinationAirport,
      })),
    }));

    this.pagination = output.pagination;
  }
}
