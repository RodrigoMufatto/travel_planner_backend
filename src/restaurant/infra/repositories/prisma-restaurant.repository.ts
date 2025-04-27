import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RestaurantRepository } from 'src/restaurant/domain/repositories/restaurant.repository';
import {
  CreateRestaurantRepositoryInputInterface,
  CreateRestaurantRepositoryOutputInterface,
  ListRestaurantByDestinationIdRepositoryInputInterface,
  ListRestaurantByDestinationIdRepositoryOutputInterface,
} from 'src/restaurant/domain/repositories/restaurant.repository.interface';
import { v4 as uuid } from 'uuid';

@Injectable()
export class PrismaRestaurantRepository implements RestaurantRepository {
  constructor(private prisma: PrismaService) {}

  async createRestaurant(
    data: CreateRestaurantRepositoryInputInterface,
  ): Promise<CreateRestaurantRepositoryOutputInterface> {
    return this.prisma.restaurant.create({
      data: {
        id: uuid(),
        name: data.name,
        priceLevel: data.priceLevel,
        rating: data.rating,
        destination: {
          connect: {
            id: data.destinationId,
          },
        },
        address: {
          create: {
            id: uuid(),
            city: data.address.city,
            country: data.address.country,
            neighborhood: data.address.neighborhood,
            number: data.address.number,
            state: data.address.state,
            street: data.address.street,
            zipcode: data.address.zipcode,
          },
        },
      },
    });
  }

  async listRestaurantByDestinationId(
    data: ListRestaurantByDestinationIdRepositoryInputInterface,
  ): Promise<{
    restaurant: ListRestaurantByDestinationIdRepositoryOutputInterface[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  }> {
    const total = await this.prisma.restaurant.count({
      where: {
        destinationId: data.destinationId,
      },
    });

    const restaurantList = await this.prisma.restaurant.findMany({
      where: {
        destinationId: data.destinationId,
      },
      select: {
        id: true,
        rating: true,
        priceLevel: true,
        address: {
          select: {
            city: true,
            state: true,
            country: true,
            neighborhood: true,
            number: true,
            zipcode: true,
            street: true,
          },
        },
      },
      skip: data.skip,
      take: data.limit,
      orderBy: {
        createdAt: 'asc',
      },
    });

    const totalPages = Math.ceil(total / data.limit);

    return {
      restaurant: restaurantList,
      pagination: {
        page: Math.floor(data.skip / data.limit) + 1,
        limit: data.limit,
        total: total,
        totalPages: totalPages,
      },
    };
  }
}
