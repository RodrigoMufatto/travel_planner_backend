import { Injectable } from '@nestjs/common';
import { TripRepository } from '../domain/repositories/trip.repository';
import {
  CreateTripServiceInputInterface,
  CreateTripServiceOutputInterface,
  GetTripByUserIdServiceOutputInterface,
  ListTripsByUserIdServiceInputInterface,
  ListTripsByUserIdServiceOutputInterface,
} from './trip.service.interface';

@Injectable()
export class TripService {
  constructor(private readonly tripRepository: TripRepository) {}

  async createTripService(
    data: CreateTripServiceInputInterface,
  ): Promise<CreateTripServiceOutputInterface> {
    const formattedDestinations = data.destination.map((dest) => ({
      ...dest,
      startDate: new Date(dest.startDate),
      endDate: new Date(dest.endDate),
    }));

    const trip = await this.tripRepository.createTrip({
      ...data,
      destination: formattedDestinations,
    });

    return trip;
  }

  async listTripsByUserIdService(
    listTripsByUserId: ListTripsByUserIdServiceInputInterface,
  ): Promise<ListTripsByUserIdServiceOutputInterface> {
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

    return {
      trips: trips.trip.map((trip) => ({
        id: trip.id,
        title: trip.title,
        destinations: trip.destinations.map((dest) => ({
          id: dest.id,
          city: dest.city,
          state: dest.state,
          country: dest.country,
          startDate: dest.startDate,
          endDate: dest.endDate,
        })),
      })),
      pagination: trips.pagination,
    };
  }

  async deleteTrip(tripId: string) {
    await this.tripRepository.deleteTripByTripId(tripId);
  }

  async getTripByIdService(
    tripId: string,
  ): Promise<GetTripByUserIdServiceOutputInterface> {
    const trip = await this.tripRepository.getTripById(tripId);

    return trip;
  }
}
