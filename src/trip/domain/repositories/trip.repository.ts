import { Trip } from '@prisma/client';
import {
  CreateTripRepositoryInputInterface,
  CreateTripRepositoryOutputInterface,
  ListTripsByUserIdRepositoryInputInterface,
  ListTripsByUserIdRepositoryOutputInterface,
} from './trip.repository.interface';

export abstract class TripRepository {
  abstract createTrip(
    data: CreateTripRepositoryInputInterface,
  ): Promise<CreateTripRepositoryOutputInterface>;

  abstract findTripsByUserId(
    data: ListTripsByUserIdRepositoryInputInterface,
  ): Promise<ListTripsByUserIdRepositoryOutputInterface[] | null>;

  abstract deleteTripByTripId(tripId: string);
}