import { Injectable } from '@nestjs/common';
import { Activity, Prisma } from '@prisma/client';
import { ActivityRepository } from 'src/activity/domain/repositories/activity.repository';
import {
  CreateActivityRepositoryInputInterface,
  ListByDestinationIdRepositoryInputInterface,
  ListByDestinationIdRepositoryOutputInterface,
} from 'src/activity/domain/repositories/activity.repository.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuid } from 'uuid';

@Injectable()
export class PrismaActivityRepository implements ActivityRepository {
  constructor(private prisma: PrismaService) {}

  async createActivity(
    data: CreateActivityRepositoryInputInterface,
  ): Promise<Activity> {
    return await this.prisma.activity.create({
      data: {
        id: uuid(),
        title: data.title,
        startDate: data.startDate,
        endDate: data.endDate,
        description: data.description,
        ...(data.cost !== undefined &&
          data.cost !== null && {
            cost: new Prisma.Decimal(data.cost),
          }),
        destination: {
          connect: {
            id: data.destinationId,
          },
        },
        address: {
          create: {
            id: uuid(),
            city: data.location.city,
            state: data.location.state,
            country: data.location.country,
            neighborhood: data.location.neighborhood,
            number: data.location.number,
            street: data.location.street,
            zipcode: data.location.zipcode,
          },
        },
      },
    });
  }

  async listByDestinationId(
    data: ListByDestinationIdRepositoryInputInterface,
  ): Promise<{
    activity: ListByDestinationIdRepositoryOutputInterface[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  }> {
    const total = await this.prisma.activity.count({
      where: {
        destinationId: data.destinationId,
      },
    });

    const list = await this.prisma.activity.findMany({
      where: {
        destinationId: data.destinationId,
      },
      select: {
        id: true,
        title: true,
        addressId: true,
        description: true,
        startDate: true,
        endDate: true,
        cost: true,
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
      activity: list,
      pagination: {
        page: Math.floor(data.skip / data.limit) + 1,
        limit: data.limit,
        total: total,
        totalPages: totalPages,
      },
    };
  }
}
