import { Injectable, NotFoundException } from '@nestjs/common';
import { RestaurantRepository } from '../domain/repositories/restaurant.repository';
import {
  CreateRestaurantServiceInputInterface,
  CreateRestaurantServiceOutputInterface,
  ListRestaurantByDestinationIdInputInterface,
  ListRestaurantByDestinationIdOutputInterface,
} from './restaurant.service.interface';
import { DestinationRepository } from 'src/shared/repositories/destination.repository';

@Injectable()
export class RestaurantService {
  constructor(
    private restaurantRepository: RestaurantRepository,
    private destinationRepository: DestinationRepository,
  ) {}

  async createRestaurantService(
    data: CreateRestaurantServiceInputInterface,
  ): Promise<CreateRestaurantServiceOutputInterface> {
    const destination = await this.destinationRepository.findById(
      data.destinationId,
    );

    if (!destination) {
      throw new NotFoundException(`Destination not found.`);
    }

    const restaurant = await this.restaurantRepository.createRestaurant({
      ...data,
    });

    return {
      id: restaurant.id,
      destinationId: restaurant.destinationId,
    };
  }

  async listRestaurantByDestinationIdService(
    data: ListRestaurantByDestinationIdInputInterface,
  ): Promise<ListRestaurantByDestinationIdOutputInterface> {
    const page = data.page ? Number(data.page) : 1;
    const limit = data.limit ? Number(data.limit) : 4;
    const skip = (page - 1) * limit;

    const destination = await this.destinationRepository.findById(
      data.destinationId,
    );

    if (!destination) {
      throw new NotFoundException(`Destination not found.`);
    }

    const restaurantList =
      await this.restaurantRepository.listRestaurantByDestinationId({
        skip,
        limit,
        destinationId: data.destinationId,
      });

    return {
      restaurant: restaurantList.restaurant,
      pagination: restaurantList.pagination,
    };
  }

  async deleteRestaurantService(restaurantId: string) {
    const restaurant =
      await this.restaurantRepository.findRestaurantById(restaurantId);

    if (!restaurant) {
      throw new NotFoundException(`Restaurant not found`);
    }

    await this.restaurantRepository.deleteRestaurantById(restaurantId);
  }
}
