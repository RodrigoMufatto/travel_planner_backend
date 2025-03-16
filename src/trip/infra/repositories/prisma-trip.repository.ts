import { Injectable } from '@nestjs/common';
import { Trip, UserTripRole } from '@prisma/client';
import { contains } from 'class-validator';
import { PrismaService } from 'src/prisma/prisma.service';
import { TripWithDestinations } from 'src/trip/domain/models/trip.model';
import { TripRepository } from 'src/trip/domain/repositories/trip.repository';
import { CreateTripDto } from 'src/trip/dto/trip.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class PrismaTripRepository implements TripRepository {
  constructor(private prisma: PrismaService) {}

  async createTrip(data: CreateTripDto): Promise<Trip> {
    return this.prisma.trip.create({
      data: {
        id: uuid(),
        title: data.title,
        startDate: new Date(data.startDate),
        endDate: data.endDate,
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
    userId: string,
    skip: number,
    limit: number,
    titleFilter?: string,
    startDateFilter?: Date,
    endDateFilter?: Date,
  ): Promise<TripWithDestinations[] | null> {
    return this.prisma.trip.findMany({
      where: {
        userTrips: {
          some: {
            userId: userId,
          },
        },
        title: titleFilter
          ? {
              contains: titleFilter,
              mode: 'insensitive',
            }
          : undefined,
        startDate:
          startDateFilter && endDateFilter
            ? {
                gte: startDateFilter,
                lte: endDateFilter,
              }
            : undefined,
      },
      include: {
        destinations: {
          select: {
            city: true,
            state: true,
            country: true,
          },
        },
      },
      skip: skip,
      take: limit,
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  async deleteTripByTripId(tripId: string) {
    await this.prisma.trip.delete({
      where: {
        id: tripId,
      },
    });
  }
}
