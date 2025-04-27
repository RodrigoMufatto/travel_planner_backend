import { Prisma } from '@prisma/client';

export interface CreateRestaurantRepositoryInputInterface {
  destinationId: string;
  name: string;
  priceLevel: number;
  rating: string;
  address: {
    city: string;
    country: string;
    neighborhood: string;
    number: string;
    state: string;
    street: string;
    zipcode: string;
  };
}

export interface CreateRestaurantRepositoryOutputInterface {
  id: string;
  destinationId: string;
}

export interface ListRestaurantByDestinationIdRepositoryInputInterface {
  destinationId: string;
  skip: number;
  limit: number;
}

export interface ListRestaurantByDestinationIdRepositoryOutputInterface {
  id: string;
  priceLevel: number;
  rating: Prisma.Decimal;
  address: {
    number: string;
    city: string;
    state: string;
    country: string;
    neighborhood: string;
    street: string;
    zipcode: string;
  };
}
[];
