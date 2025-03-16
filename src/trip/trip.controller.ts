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
import { CreateTripDto, listTripsByUserIdDto } from './dto/trip.dto';
import { TripService } from './trip.service';
import { AuthGuard } from '../auth/auth.guards';

@Controller('trip')
export class TripController {
  constructor(private tripService: TripService) {}

  @UseGuards(AuthGuard)
  @Post('create')
  async createTrip(@Body() body: CreateTripDto) {
    return await this.tripService.createTripService(body);
  }

  @UseGuards(AuthGuard)
  @Get('list/:userId')
  async listTripsByUserId(
    @Param('userId') userId: string,
    @Query() query: listTripsByUserIdDto,
  ) {
    return await this.tripService.listTripsByUserIdService(userId, query);
  }

  @UseGuards(AuthGuard)
  @Delete('delete/:tripId')
  async deleteTripByTripId(@Param('tripId') tripId: string) {
    await this.tripService.deleteTrip(tripId);

    return { statusCode: 204 };
  }
}
