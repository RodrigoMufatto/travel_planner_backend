import { Injectable } from '@nestjs/common';
import { HotelRepository } from 'src/hotel/domain/repositories/hotel.repository';
import {
  CreateHotelRepositoryInputInterface,
  CreateHotelRepositoryOutputInterface,
  ListHotelByDestinationIdRepositoryInputInterface,
  ListHotelByDestinationIdRepositoryOutputInterface,
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

  async listHotelByDestinationId(
    data: ListHotelByDestinationIdRepositoryInputInterface,
  ): Promise<{
    hotel: ListHotelByDestinationIdRepositoryOutputInterface[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  }> {
    const total = await this.prisma.hotel.count({
      where: {
        destinationId: data.destinationId,
      },
    });

    const hotelList = await this.prisma.hotel.findMany({
      where: {
        destinationId: data.destinationId,
      },
      select: {
        id: true,
        name: true,
        rating: true,
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
      hotel: hotelList,
      pagination: {
        page: Math.floor(data.skip / data.limit) + 1,
        limit: data.limit,
        total: total,
        totalPages: totalPages,
      },
    };
  }
}
