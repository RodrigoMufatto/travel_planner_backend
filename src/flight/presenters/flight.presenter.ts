import { CreateFlightServiceOutputInterface } from '../application/flight.service.interface';

export class CreateFlightPresenter {
  id: string;
  destinationId: string;

  constructor(flight: CreateFlightServiceOutputInterface) {
    this.id = flight.id;
    this.destinationId = flight.destinationId;
  }
}
