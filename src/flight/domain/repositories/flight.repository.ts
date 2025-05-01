import {
  CreateFlightRepositoryInputInterface,
  CreateFlightRepositoryOutputInterface,
} from './flight.repository.interface';

export abstract class FlightRepository {
  abstract createFlight(
    data: CreateFlightRepositoryInputInterface,
  ): Promise<CreateFlightRepositoryOutputInterface>;
}
