import { CreateRestaurantServiceOutputInterface } from '../application/restaurant.service.interface';

export class CreateRestaurantPresenter {
  id: string;
  destinationId: string;

  constructor(restaurant: CreateRestaurantServiceOutputInterface) {
    this.id = restaurant.id;
    this.destinationId = restaurant.destinationId;
  }
}
