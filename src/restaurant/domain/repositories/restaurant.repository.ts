import {
  CreateRestaurantRepositoryInputInterface,
  CreateRestaurantRepositoryOutputInterface,
} from './restaurant.repository.interface';

export abstract class RestaurantRepository {
  abstract createRestaurant(
    data: CreateRestaurantRepositoryInputInterface,
  ): Promise<CreateRestaurantRepositoryOutputInterface>;
}
