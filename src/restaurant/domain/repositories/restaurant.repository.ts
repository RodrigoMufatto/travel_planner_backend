import {
  CreateRestaurantRepositoryInputInterface,
  CreateRestaurantRepositoryOutputInterface,
  ListRestaurantByDestinationIdRepositoryInputInterface,
  ListRestaurantByDestinationIdRepositoryOutputInterface,
} from './restaurant.repository.interface';

export abstract class RestaurantRepository {
  abstract createRestaurant(
    data: CreateRestaurantRepositoryInputInterface,
  ): Promise<CreateRestaurantRepositoryOutputInterface>;

  abstract listRestaurantByDestinationId(
    data: ListRestaurantByDestinationIdRepositoryInputInterface,
  ): Promise<{
    restaurant: ListRestaurantByDestinationIdRepositoryOutputInterface[] | null;
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  }>;
}
