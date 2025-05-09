import { Trip } from '@prisma/client';
import {
  CreateTripRepositoryInputInterface,
  CreateTripRepositoryOutputInterface,
  GetTripByUserIdRepositoryOutputInterface,
  ListTripsByUserIdRepositoryInputInterface,
  ListTripsByUserIdRepositoryOutputInterface,
} from './trip.repository.interface';

export abstract class TripRepository {
  abstract createTrip(
    data: CreateTripRepositoryInputInterface,
  ): Promise<CreateTripRepositoryOutputInterface>;

  abstract findTripsByUserId(
    data: ListTripsByUserIdRepositoryInputInterface,
  ): Promise<{
    trip: ListTripsByUserIdRepositoryOutputInterface[] | null;
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  }>;

  abstract deleteTripByTripId(tripId: string);

  abstract getTripById(
    tripId: string,
  ): Promise<GetTripByUserIdRepositoryOutputInterface>;
}