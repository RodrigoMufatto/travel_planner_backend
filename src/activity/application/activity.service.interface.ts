import { Prisma } from "@prisma/client";

interface AddressInterface {
  city: string;
  state: string;
  country: string;
  number: string;
  neighborhood: string;
  street: string;
  zipcode: string;
}

export interface CreateActivityServiceInputInterface {
  destinationId: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: AddressInterface;
  cost?: number;
}

export interface CreateActivityServiceOutputInterface {
  id: string;
  destinationId: string;
}

export interface ListByDestinationIdInputInterface {
  destinationId: string;
  page?: string;
  limit?: string;
}

export interface ActivityAddressInterface {
  city: string;
  state: string;
  country: string;
  neighborhood: string;
  number: string;
  zipcode: string;
  street: string;
}
export interface ListByDestinationIdOutputInterface {
  activity: {
    id: string;
    title: string;
    addressId: string;
    description: string;
    startDate: Date;
    endDate: Date | null;
    cost: Prisma.Decimal;
    address: ActivityAddressInterface;
  }[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}