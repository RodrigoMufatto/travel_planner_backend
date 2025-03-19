import {
  CreateTripServiceOutputInterface,
  ListTripsByUserIdServiceOutputInterface,
} from '../application/trip.service.interface';

export class ListTripsByUserIdPresenter {
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

  constructor(trip: ListTripsByUserIdServiceOutputInterface) {
    this.id = trip.id;
    this.title = trip.title;
    this.startDate = trip.startDate;
    this.endDate = trip.endDate;
    this.destinations = trip.destinations.map((dest) => ({
      id: dest.id,
      city: dest.city,
      state: dest.state,
      country: dest.country,
    }));
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
