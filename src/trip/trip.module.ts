import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaTripRepository } from './infra/repositories/prisma-trip.repository';
import { TripRepository } from './domain/repositories/trip.repository';
import { TripService } from './application/trip.service';
import { TripController } from './controllers/trip.controller';

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
