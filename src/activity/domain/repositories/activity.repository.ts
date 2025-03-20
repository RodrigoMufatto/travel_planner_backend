import { Activity } from '@prisma/client';
import {
  CreateActivityRepositoryInputInterface,
  ListByDestinationIdRepositoryInputInterface,
  ListByDestinationIdRepositoryOutputInterface,
} from './activity.repository.interface';

export abstract class ActivityRepository {
  abstract createActivity(
    data: CreateActivityRepositoryInputInterface,
  ): Promise<Activity>;

  abstract listByDestinationId(
    data: ListByDestinationIdRepositoryInputInterface,
  ): Promise<{
    activity: ListByDestinationIdRepositoryOutputInterface[];
    pagination: { page: number; limit: number; total: number };
  }>;
}
