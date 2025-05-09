import {
  CreateTripServiceOutputInterface,
  GetTripByUserIdServiceOutputInterface,
  ListTripsByUserIdServiceOutputInterface,
} from '../application/trip.service.interface';

export class ListTripsByUserIdPresenter {
  trips: {
    id: string;
    title: string;
    destinations: {
      id: string;
      city: string;
      state: string;
      country: string;
      startDate: Date;
      endDate: Date;
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
      destinations: trip.destinations.map((dest) => ({
        id: dest.id,
        city: dest.city,
        state: dest.state,
        country: dest.country,
        startDate: dest.startDate,
        endDate: dest.endDate,
      })),
    }));

    this.pagination = serviceResponse.pagination;
  }
}

export class CreateTripPresenter {
  id: string;
  title: string;

  constructor(trip: CreateTripServiceOutputInterface) {
    this.id = trip.id;
    this.title = trip.title;
  }
}

export class GetTripByUserIdPresenter {
  title: string;
  id: string;
  destinations: {
    id: string;
    startDate: Date;
    endDate: Date;
    city: string;
    country: string;
    latitude: string;
    longitude: string;
  }[];

  constructor(trip: GetTripByUserIdServiceOutputInterface) {
    this.id = trip.id;
    this.title = trip.title;
    this.destinations = trip.destinations.map((dest) => ({
      id: dest.id,
      city: dest.city,
      country: dest.country,
      endDate: dest.endDate,
      startDate: dest.startDate,
      latitude: dest.latitude,
      longitude: dest.longitude,
    }));
  }
}
