import { Module } from '@nestjs/common';
import { FlightService } from './application/flight.service';
import { FlightController } from './controllers/flight.controller';
import { RepositoriesModule } from 'src/shared/repositories/repositories.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaFlightRepository } from './infra/repositories/prisma-flight.repository';
import { FlightRepository } from './domain/repositories/flight.repository';

@Module({
  imports: [RepositoriesModule],
  controllers: [FlightController],
  providers: [
    FlightService,
    PrismaService,
    PrismaFlightRepository,
    { provide: FlightRepository, useClass: PrismaFlightRepository },
  ],
})
export class FlightModule {}
