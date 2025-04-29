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
