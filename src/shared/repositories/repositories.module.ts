import { Module } from '@nestjs/common';
import { DestinationRepository } from './destination.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [DestinationRepository, PrismaService],
  exports: [DestinationRepository],
})
export class RepositoriesModule {}
