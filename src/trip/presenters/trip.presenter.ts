import {
  CreateTripServiceOutputInterface,
  ListTripsByUserIdServiceOutputInterface,
} from '../application/trip.service.interface';

export class ListTripsByUserIdPresenter {
  trips: {
    id: string;
    title: string;
    startDate: Date;
    endDate: Date;
    destinations: {
      id: string;
      city: string;
      state: string;
      country: string;
    }[];
  }[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };

  constructor(serviceResponse: ListTripsByUserIdServiceOutputInterface) {
    this.trips = serviceResponse.trips.map((trip) => ({
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

    this.pagination = serviceResponse.pagination;
  }
}

export class CreateTripPresenter {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;

  constructor(trip: CreateTripServiceOutputInterface) {
    this.id = trip.id;
    this.title = trip.title;
    this.startDate = trip.startDate;
    this.endDate = trip.endDate;
  }
}
