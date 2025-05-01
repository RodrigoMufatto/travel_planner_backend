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
