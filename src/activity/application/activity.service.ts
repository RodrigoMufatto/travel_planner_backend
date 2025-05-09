import { Injectable, NotFoundException } from '@nestjs/common';
import { ActivityRepository } from '../domain/repositories/activity.repository';
import {
  CreateActivityServiceInputInterface,
  CreateActivityServiceOutputInterface,
  ListByDestinationIdInputInterface,
  ListByDestinationIdOutputInterface,
} from './activity.service.interface';
import { DestinationRepository } from 'src/shared/repositories/destination.repository';

@Injectable()
export class ActivityService {
  constructor(
    private activityRepository: ActivityRepository,
    private destinationRepository: DestinationRepository,
  ) {}

  async createActivityService(
    data: CreateActivityServiceInputInterface,
  ): Promise<CreateActivityServiceOutputInterface> {
    const destination = await this.destinationRepository.findById(
      data.destinationId,
    );

    if (!destination) {
      throw new NotFoundException(`Destination not found.`);
    }

    const activity = await this.activityRepository.createActivity({
      ...data,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
    });

    return {
      id: activity.id,
      destinationId: activity.destinationId,
    };
  }

  async listByDestinationIdService(
    data: ListByDestinationIdInputInterface,
  ): Promise<ListByDestinationIdOutputInterface> {
    const page = data.page ? Number(data.page) : 1;
    const limit = data.limit ? Number(data.limit) : 9;
    const skip = (page - 1) * limit;

    const destination = await this.destinationRepository.findById(
      data.destinationId,
    );

    if (!destination) {
      throw new NotFoundException(`Destination not found.`);
    }

    const listActivities = await this.activityRepository.listByDestinationId({
      skip,
      limit,
      destinationId: data.destinationId,
    });

    return {
      activity: listActivities.activity,
      pagination: listActivities.pagination,
    };
  }
}
