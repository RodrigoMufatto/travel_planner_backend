import {
  CreateFlightRepositoryInputInterface,
  CreateFlightRepositoryOutputInterface,
  ListFlightByDestinationIdRepositoryInputInterface,
  ListFlightByDestinationIdRepositoryOutputInterface,
} from './flight.repository.interface';

export abstract class FlightRepository {
  abstract createFlight(
    data: CreateFlightRepositoryInputInterface,
  ): Promise<CreateFlightRepositoryOutputInterface>;

  abstract listFlightByDestinationId(
    data: ListFlightByDestinationIdRepositoryInputInterface,
  ): Promise<ListFlightByDestinationIdRepositoryOutputInterface>;
}
