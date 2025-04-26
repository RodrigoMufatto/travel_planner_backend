import { Injectable } from '@nestjs/common';
import { RestaurantRepository } from '../domain/repositories/restaurant.repository';
import {
  CreateRestaurantServiceInputInterface,
  CreateRestaurantServiceOutputInterface,
} from './restaurant.service.interface';

@Injectable()
export class RestaurantService {
  constructor(private restaurantRepository: RestaurantRepository) {}

  async createRestaurantService(
    data: CreateRestaurantServiceInputInterface,
  ): Promise<CreateRestaurantServiceOutputInterface> {
    const restaurant = await this.restaurantRepository.createRestaurant({
      ...data,
    });

    return {
      id: restaurant.id,
      destinationId: restaurant.destinationId,
    };
  }
}
