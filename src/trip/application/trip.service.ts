import { Injectable, NotFoundException } from '@nestjs/common';
import { TripRepository } from '../domain/repositories/trip.repository';
import {
  CreateTripServiceInputInterface,
  CreateTripServiceOutputInterface,
  GetTripByUserIdServiceOutputInterface,
  ListTripsByUserIdServiceInputInterface,
  ListTripsByUserIdServiceOutputInterface,
} from './trip.service.interface';
import { UserRepository } from 'src/shared/repositories/user.repository';

@Injectable()
export class TripService {
  constructor(
    private readonly tripRepository: TripRepository,
    private userRepository: UserRepository,
  ) {}

  async createTripService(
    data: CreateTripServiceInputInterface,
  ): Promise<CreateTripServiceOutputInterface> {
    const user = await this.userRepository.findById(data.userTrips.userId);

    if (!user) {
      throw new NotFoundException(`User not found.`);
    }

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

    const user = await this.userRepository.findById(listTripsByUserId.userId);

    if (!user) {
      throw new NotFoundException(`User not found.`);
    }

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
    const trip = await this.tripRepository.findTripById(tripId);

    if (!trip) {
      throw new NotFoundException(`Trip not found`);
    }

    await this.tripRepository.deleteTripByTripId(tripId);
  }

  async getTripByIdService(
    tripId: string,
  ): Promise<GetTripByUserIdServiceOutputInterface> {
    const uniqueTrip = await this.tripRepository.findTripById(tripId);

    if (!uniqueTrip) {
      throw new NotFoundException(`Trip not found`);
    }

    const trip = await this.tripRepository.getTripById(tripId);

    return trip;
  }
}
