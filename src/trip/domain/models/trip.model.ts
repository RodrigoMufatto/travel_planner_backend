import { Trip } from '@prisma/client';

export type TripWithDestinations = Trip & {
  destinations: {
    city: string;
    state: string;
    country: string;
  }[];
};
