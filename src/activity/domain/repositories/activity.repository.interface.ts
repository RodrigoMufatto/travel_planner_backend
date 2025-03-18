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
