import { Injectable } from '@nestjs/common';
import { FlightRepository } from 'src/flight/domain/repositories/flight.repository';
import {
  CreateFlightRepositoryInputInterface,
  CreateFlightRepositoryOutputInterface,
} from 'src/flight/domain/repositories/flight.repository.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuid } from 'uuid';

@Injectable()
export class PrismaFlightRepository implements FlightRepository {
  constructor(private prisma: PrismaService) {}

  async createFlight(
    data: CreateFlightRepositoryInputInterface,
  ): Promise<CreateFlightRepositoryOutputInterface> {
    return this.prisma.generalFlight.create({
      data: {
        id: uuid(),
        stopNumber: data.stopNumber,
        nonStop: data.nonStop,
        duration: data.duration,
        price: data.price,
        destination: {
          connect: {
            id: data.destinationId,
          },
        },
        Flight: {
          create: data.flights.map((flight) => ({
            id: uuid(),
            airlineName: flight.airlineName,
            arrivalDate: flight.arrivalDate,
            arrivalTime: flight.arrivalTime,
            carrierCodeAirline: flight.carrierCodeAirline,
            departureDate: flight.departureDate,
            departureTime: flight.departureTime,
            destinationAirport: flight.destinationAirport,
            originAirport: flight.originAirport,
            order: flight.order,
          })),
        },
      },
    });
  }
}
