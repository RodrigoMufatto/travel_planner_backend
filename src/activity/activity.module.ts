import { Module } from '@nestjs/common';
import { ActivityController } from './controllers/activity.controller';
import { ActivityService } from './application/activity.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaActivityRepository } from './infra/repositories/prisma-activity.repository';
import { ActivityRepository } from './domain/repositories/activity.repository';
import { RepositoriesModule } from 'src/shared/repositories/repositories.module';

@Module({
  imports: [RepositoriesModule],
  controllers: [ActivityController],
  providers: [
    ActivityService,
    PrismaService,
    PrismaActivityRepository,
    { provide: ActivityRepository, useClass: PrismaActivityRepository },
  ],
})
export class ActivityModule {}
