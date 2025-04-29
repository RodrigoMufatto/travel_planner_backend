import { Prisma } from '@prisma/client';

export interface CreateHotelServiceInputInterface {
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

export interface CreateHotelServiceOutputInterface {
  id: string;
  destinationId: string;
}

export interface ListHotelByDestinationIdInputInterface {
  destinationId: string;
  page?: string;
  limit?: string;
}

export interface HotelAddressInterface {
  city: string;
  state: string;
  country: string;
  neighborhood: string;
  number: string;
  zipcode: string;
  street: string;
}

export interface ListHotelByDestinationIdOutputInterface {
  hotel: {
    id: string;
    name: string;
    rating: Prisma.Decimal;
    address: HotelAddressInterface;
  }[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
