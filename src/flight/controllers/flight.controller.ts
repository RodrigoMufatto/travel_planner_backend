import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FlightService } from '../application/flight.service';
import { AuthGuard } from 'src/auth/auth.guards';
import {
  CreateFlightPresenter,
  ListFlightByDestinationIdPresenter,
} from '../presenters/flight.presenter';
import {
  CreateFlightDto,
  ListFlightByDestinationIdDto,
} from '../dto/flight.dto';

@Controller('flight')
export class FlightController {
  constructor(private flightService: FlightService) {}

  @UseGuards(AuthGuard)
  @Post('create')
  async create(@Body() body: CreateFlightDto) {
    const flight = await this.flightService.createFlightService(body);

    return new CreateFlightPresenter(flight);
  }

  @UseGuards(AuthGuard)
  @Get('list/:destinationId')
  async listFlightByDestinationId(
    @Param('destinationId') destinationId: string,
    @Query() query: ListFlightByDestinationIdDto,
  ) {
    const flightList =
      await this.flightService.listFlightByDestinationIdService({
        destinationId,
        ...query,
      });

    return new ListFlightByDestinationIdPresenter(flightList);
  }
}
