import { Injectable } from '@nestjs/common';
import { UserTripRole } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { TripRepository } from 'src/trip/domain/repositories/trip.repository';
import {
  CreateTripRepositoryInputInterface,
  CreateTripRepositoryOutputInterface,
  GetTripByUserIdRepositoryOutputInterface,
  ListTripsByUserIdRepositoryInputInterface,
  ListTripsByUserIdRepositoryOutputInterface,
} from 'src/trip/domain/repositories/trip.repository.interface';
import { v4 as uuid } from 'uuid';

@Injectable()
export class PrismaTripRepository implements TripRepository {
  constructor(private prisma: PrismaService) {}

  async createTrip(
    data: CreateTripRepositoryInputInterface,
  ): Promise<CreateTripRepositoryOutputInterface> {
    return this.prisma.trip.create({
      data: {
        id: uuid(),
        title: data.title,
        userTrips: {
          create: {
            id: uuid(),
            userId: data.userTrips.userId,
            role: UserTripRole.OWNER,
          },
        },
        destinations: {
          createMany: { data: data.destination },
        },
      },
    });
  }

  async findTripsByUserId(
    data: ListTripsByUserIdRepositoryInputInterface,
  ): Promise<{
    trip: ListTripsByUserIdRepositoryOutputInterface[] | null;
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  }> {
    const total = await this.prisma.trip.count({
      where: {
        userTrips: {
          some: {
            userId: data.userId,
          },
        },
      },
    });

    const list = await this.prisma.trip.findMany({
      where: {
        userTrips: {
          some: {
            userId: data.userId,
          },
        },
        title: data.title
          ? {
              contains: data.title,
              mode: 'insensitive',
            }
          : undefined,
        destinations: {
          some: {
            startDate:
              data.startDate && data.endDate
                ? {
                    gte: data.startDate,
                    lte: data.endDate,
                  }
                : undefined,
          },
        },
      },
      include: {
        destinations: {
          select: {
            id: true,
            city: true,
            state: true,
            country: true,
            startDate: true,
            endDate: true,
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
      trip: list,
      pagination: {
        page: Math.floor(data.skip / data.limit) + 1,
        limit: data.limit,
        total: total,
        totalPages: totalPages,
      },
    };
  }

  async deleteTripByTripId(tripId: string) {
    await this.prisma.trip.delete({
      where: {
        id: tripId,
      },
    });
  }

  async getTripById(
    tripId: string,
  ): Promise<GetTripByUserIdRepositoryOutputInterface> {
    const trip = await this.prisma.trip.findFirst({
      where: {
        id: tripId,
      },
      select: {
        id: true,
        title: true,
        destinations: {
          select: {
            id: true,
            city: true,
            country: true,
            startDate: true,
            endDate: true,
            latitude: true,
            longitude: true,
          },
        },
      },
    });

    return trip;
  }
}
