import { Activity } from '@prisma/client';
import { CreateActivityRepositoryInputInterface } from './activity.repository.interface';

export abstract class ActivityRepository {
  abstract createActivity(
    data: CreateActivityRepositoryInputInterface,
  ): Promise<Activity>;
}
