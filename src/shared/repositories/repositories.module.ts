import { Module } from '@nestjs/common';
import { DestinationRepository } from './destination.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserRepository } from './user.repository';

@Module({
  providers: [DestinationRepository, PrismaService, UserRepository],
  exports: [DestinationRepository, UserRepository],
})
export class RepositoriesModule {}
