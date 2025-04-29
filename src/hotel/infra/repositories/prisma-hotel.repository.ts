import { Injectable } from '@nestjs/common';
import { HotelRepository } from 'src/hotel/domain/repositories/hotel.repository';
import {
  CreateHotelRepositoryInputInterface,
  CreateHotelRepositoryOutputInterface,
} from 'src/hotel/domain/repositories/hotel.repository.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuid } from 'uuid';

@Injectable()
export class PrismaHotelRepository implements HotelRepository {
  constructor(private prisma: PrismaService) {}

  async createHotel(
    data: CreateHotelRepositoryInputInterface,
  ): Promise<CreateHotelRepositoryOutputInterface> {
    return this.prisma.hotel.create({
      data: {
        id: uuid(),
        name: data.name,
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
