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
