import { Injectable } from '@nestjs/common';
import { TripRepository } from '../domain/repositories/trip.repository';
import {
  CreateTripServiceInputInterface,
  CreateTripServiceOutputInterface,
  ListTripsByUserIdServiceInputInterface,
  ListTripsByUserIdServiceOutputInterface,
} from './trip.service.interface';

@Injectable()
export class TripService {
  constructor(private readonly tripRepository: TripRepository) {}

  async createTripService(
    data: CreateTripServiceInputInterface,
  ): Promise<CreateTripServiceOutputInterface> {
    const trip = await this.tripRepository.createTrip({
      ...data,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
    });

    return trip;
  }

  async listTripsByUserIdService(
    listTripsByUserId: ListTripsByUserIdServiceInputInterface,
  ): Promise<ListTripsByUserIdServiceOutputInterface[]> {
    const page = listTripsByUserId.page ? Number(listTripsByUserId.page) : 1;
    const limit = listTripsByUserId.limit ? Number(listTripsByUserId.limit) : 9;
    const skip = (page - 1) * limit;

    const trips = await this.tripRepository.findTripsByUserId({
      userId: listTripsByUserId.userId,
      title: listTripsByUserId.title,
      startDate: listTripsByUserId.startDate
        ? new Date(listTripsByUserId.startDate)
        : undefined,
      endDate: listTripsByUserId.endDate
        ? new Date(listTripsByUserId.endDate)
        : undefined,
      skip,
      limit,
    });

    if (!trips || trips.length === 0) {
      throw new Error('No trips found for this user');
    }

    return trips.map((trip) => ({
      id: trip.id,
      title: trip.title,
      startDate: trip.startDate,
      endDate: trip.endDate,
      destinations: trip.destinations.map((dest) => ({
        id: dest.id,
        city: dest.city,
        state: dest.state,
        country: dest.country,
      })),
    }));
  }

  async deleteTrip(tripId: string) {
    await this.tripRepository.deleteTripByTripId(tripId);
  }
}
