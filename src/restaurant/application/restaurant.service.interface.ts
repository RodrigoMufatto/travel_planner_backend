import { Prisma } from '@prisma/client';

export interface CreateRestaurantServiceInputInterface {
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

export interface CreateRestaurantServiceOutputInterface {
  id: string;
  destinationId: string;
}

export interface ListRestaurantByDestinationIdInputInterface {
  destinationId: string;
  page?: string;
  limit?: string;
}

export interface RestaurantAddressInterface {
  city: string;
  state: string;
  country: string;
  neighborhood: string;
  number: string;
  zipcode: string;
  street: string;
}

export interface ListRestaurantByDestinationIdOutputInterface {
  restaurant: {
    id: string;
    name: string;
    priceLevel: number;
    rating: Prisma.Decimal;
    address: RestaurantAddressInterface;
  }[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
