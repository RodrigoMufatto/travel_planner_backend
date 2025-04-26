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
