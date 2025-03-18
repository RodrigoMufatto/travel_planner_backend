import { Injectable } from '@nestjs/common';
import { ActivityRepository } from '../domain/repositories/activity.repository';
import {
  CreateActivityServiceInputInterface,
  CreateActivityServiceOutputInterface,
} from './activity.service.interface';

@Injectable()
export class ActivityService {
  constructor(private activityRepository: ActivityRepository) {}

  async createActivityService(
    data: CreateActivityServiceInputInterface,
  ): Promise<CreateActivityServiceOutputInterface> {
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
}
