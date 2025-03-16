import { Injectable } from '@nestjs/common';
import { CreateTripDto, listTripsByUserIdDto } from './dto/trip.dto';
import { TripRepository } from './domain/repositories/trip.repository';

@Injectable()
export class TripService {
  constructor(private readonly tripRepository: TripRepository) {}

  async createTripService(data: CreateTripDto) {
    const trip = await this.tripRepository.createTrip(data);

    return trip;
  }

  async listTripsByUserIdService(
    userId: string,
    listTripsByUserId: listTripsByUserIdDto,
  ) {
    const page = listTripsByUserId.page ? Number(listTripsByUserId.page) : 1;
    const limit = listTripsByUserId.limit ? Number(listTripsByUserId.limit) : 9;
    const skip = (page - 1) * limit;

    const trips = await this.tripRepository.findTripsByUserId(
      userId,
      skip,
      limit,
      listTripsByUserId.title,
      listTripsByUserId.startDate
        ? new Date(listTripsByUserId.startDate)
        : undefined,
      listTripsByUserId.endDate
        ? new Date(listTripsByUserId.endDate)
        : undefined,
    );

    if (!trips || trips.length === 0) {
      throw new Error('No trips found for this user');
    }

    return trips.map((trip) => ({
      id: trip.id,
      title: trip.title,
      startDate: trip.startDate,
      endDate: trip.endDate,
      destinations: trip.destinations.map((dest) => ({
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
