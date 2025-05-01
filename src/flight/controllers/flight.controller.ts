import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { FlightService } from '../application/flight.service';
import { AuthGuard } from 'src/auth/auth.guards';
import { CreateFlightPresenter } from '../presenters/flight.presenter';
import { CreateFlightDto } from '../dto/flight.dto';

@Controller('flight')
export class FlightController {
  constructor(private flightService: FlightService) {}

  @UseGuards(AuthGuard)
  @Post('create')
  async create(@Body() body: CreateFlightDto) {
    const flight = await this.flightService.createFlightService(body);

    return new CreateFlightPresenter(flight);
  }
}
