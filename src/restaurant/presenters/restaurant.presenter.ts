import {
  CreateRestaurantServiceOutputInterface,
  ListRestaurantByDestinationIdOutputInterface,
  RestaurantAddressInterface,
} from '../application/restaurant.service.interface';

export class CreateRestaurantPresenter {
  id: string;
  destinationId: string;

  constructor(restaurant: CreateRestaurantServiceOutputInterface) {
    this.id = restaurant.id;
    this.destinationId = restaurant.destinationId;
  }
}

export class ListRestaurantByDestinationIdPresenter {
  restaurant: {
    id: string;
    priceLevel: number;
    rating: number;
    address: RestaurantAddressInterface;
  }[];

  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };

  constructor(output: ListRestaurantByDestinationIdOutputInterface) {
    this.restaurant = output.restaurant.map((item) => ({
      id: item.id,
      priceLevel: item.priceLevel,
      rating: Number(item.rating),
      address: item.address,
    }));

    this.pagination = output.pagination;
  }
}
