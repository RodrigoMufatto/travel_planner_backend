import { Trip } from '@prisma/client';
import { CreateTripDto } from 'src/trip/dto/trip.dto';
import { TripWithDestinations } from '../models/trip.model';

export abstract class TripRepository {
  abstract createTrip(data: CreateTripDto): Promise<Trip>;
  abstract findTripsByUserId(
    userId: string,
    skip: number,
    limit: number,
    titleFilter?: string,
    startDateFilter?: Date,
    endDateFilter?: Date,
  ): Promise<TripWithDestinations[] | null>;
  abstract deleteTripByTripId(tripId: string);
}
