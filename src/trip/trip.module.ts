import { Module } from '@nestjs/common';
import { TripController } from './trip.controller';
import { TripService } from './trip.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaTripRepository } from './infra/repositories/prisma-trip.repository';
import { TripRepository } from './domain/repositories/trip.repository';

@Module({
  controllers: [TripController],
  providers: [
    TripService,
    PrismaService,
    PrismaTripRepository,
    { provide: TripRepository, useClass: PrismaTripRepository },
  ],
})
export class TripModule {}
