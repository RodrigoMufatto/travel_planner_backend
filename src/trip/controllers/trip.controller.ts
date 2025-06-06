import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateTripDto, ListTripsByUserIdDto } from '../dto/trip.dto';
import { TripService } from '../application/trip.service';
import { AuthGuard } from 'src/auth/auth.guards';
import {
  CreateTripPresenter,
  GetTripByUserIdPresenter,
  ListTripsByUserIdPresenter,
} from '../presenters/trip.presenter';

@Controller('trip')
export class TripController {
  constructor(private tripService: TripService) {}

  @UseGuards(AuthGuard)
  @Post('create')
  async createTrip(@Body() body: CreateTripDto) {
    const trip = await this.tripService.createTripService(body);

    return new CreateTripPresenter(trip);
  }

  @UseGuards(AuthGuard)
  @Get('list/:userId')
  async listTripsByUserId(
    @Param('userId') userId: string,
    @Query() query: ListTripsByUserIdDto,
  ) {
    const list = await this.tripService.listTripsByUserIdService({
      userId,
      ...query,
    });

    return new ListTripsByUserIdPresenter(list);
  }

  @UseGuards(AuthGuard)
  @Delete('delete/:tripId')
  async deleteTripByTripId(@Param('tripId') tripId: string) {
    await this.tripService.deleteTrip(tripId);

    return { statusCode: 204 };
  }

  @UseGuards(AuthGuard)
  @Get(':tripId')
  async getTripById(@Param('tripId') tripId: string) {
    const trip = await this.tripService.getTripByIdService(tripId);

    return new GetTripByUserIdPresenter(trip);
  }
}
