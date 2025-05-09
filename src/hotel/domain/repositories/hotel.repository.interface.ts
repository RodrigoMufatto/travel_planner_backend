import { Prisma } from '@prisma/client';

export interface CreateHotelRepositoryInputInterface {
  destinationId: string;
  name: string;
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

export interface CreateHotelRepositoryOutputInterface {
  id: string;
  destinationId: string;
}

export interface ListHotelByDestinationIdRepositoryInputInterface {
  destinationId: string;
  skip: number;
  limit: number;
}
export interface ListHotelByDestinationIdRepositoryOutputInterface {
  id: string;
  name: string;
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
