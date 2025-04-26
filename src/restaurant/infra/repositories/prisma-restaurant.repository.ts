import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RestaurantRepository } from 'src/restaurant/domain/repositories/restaurant.repository';
import {
  CreateRestaurantRepositoryInputInterface,
  CreateRestaurantRepositoryOutputInterface,
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
}
