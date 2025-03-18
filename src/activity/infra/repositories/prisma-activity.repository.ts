import { Injectable } from '@nestjs/common';
import { Activity, Prisma } from '@prisma/client';
import { ActivityRepository } from 'src/activity/domain/repositories/activity.repository';
import { CreateActivityRepositoryInputInterface } from 'src/activity/domain/repositories/activity.repository.interface';
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
        cost: new Prisma.Decimal(data.cost),
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
}
