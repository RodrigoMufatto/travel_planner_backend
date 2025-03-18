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
