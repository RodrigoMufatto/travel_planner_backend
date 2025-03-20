import { Prisma } from '@prisma/client';

interface AddressInterface {
  city: string;
  state: string;
  country: string;
  number: string;
  neighborhood: string;
  street: string;
  zipcode: string;
}

export interface CreateActivityRepositoryInputInterface {
  destinationId: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location: AddressInterface;
  cost?: number;
}

export interface ListByDestinationIdRepositoryInputInterface {
  destinationId: string;
  skip: number;
  limit: number;
}

export interface ListByDestinationIdRepositoryOutputInterface {
  id: string;
  title: string;
  addressId: string;
  description: string | null;
  startDate: Date;
  endDate: Date | null;
  cost: Prisma.Decimal | null;
  address: {
    number: string;
    city: string;
    state: string;
    country: string;
    neighborhood: string;
    street: string;
    zipcode: string;
  }
}
[];
