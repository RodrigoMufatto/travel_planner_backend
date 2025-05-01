import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FlightRepository } from '../domain/repositories/flight.repository';
import {
  CreateFlightServiceInputInterface,
  CreateFlightServiceOutputInterface,
} from './flight.service.interface';
import { DestinationRepository } from 'src/shared/repositories/destination.repository';

@Injectable()
export class FlightService {
  constructor(
    private flightRepository: FlightRepository,
    private destinationRepository: DestinationRepository,
  ) {}

  async createFlightService(
    data: CreateFlightServiceInputInterface,
  ): Promise<CreateFlightServiceOutputInterface> {
    const destination = await this.destinationRepository.findById(
      data.destinationId,
    );

    if (!destination) {
      throw new NotFoundException(`Destination not found.`);
    }

    if (!data.flights || data.flights.length === 0) {
      throw new BadRequestException('At least one flight must be provided.');
    }

    const flightsWithDatesParsed = data.flights.map((flight) => ({
      ...flight,
      departureDate: new Date(flight.departureDate),
      departureTime: new Date(flight.departureTime),
      arrivalDate: new Date(flight.arrivalDate),
      arrivalTime: new Date(flight.arrivalTime),
    }));

    for (const flight of flightsWithDatesParsed) {
      if (flight.arrivalDate < flight.departureDate) {
        throw new BadRequestException(
          'Arrival date cannot be before departure date.',
        );
      }
    }

    const flight = await this.flightRepository.createFlight({
      ...data,
      flights: flightsWithDatesParsed,
    });

    return {
      id: flight.id,
      destinationId: flight.destinationId,
    };
  }
}
