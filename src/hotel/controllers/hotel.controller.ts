import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { HotelService } from '../application/hotel.service';
import { AuthGuard } from 'src/auth/auth.guards';
import { CreateHotelDto, ListHotelByDestinationIdDto } from '../dto/hotel.dto';
import {
  CreateHotelPresenter,
  ListHotelByDestinationIdPresenter,
} from '../presenters/hotel.presenter';

@Controller('hotel')
export class HotelController {
  constructor(private hotelService: HotelService) {}

  @UseGuards(AuthGuard)
  @Post('create')
  async create(@Body() body: CreateHotelDto) {
    const hotel = await this.hotelService.createHotelService(body);

    return new CreateHotelPresenter(hotel);
  }

  @UseGuards(AuthGuard)
  @Get('list/:destinationId')
  async listByDestinationId(
    @Param('destinationId') destinationId: string,
    @Query() query: ListHotelByDestinationIdDto,
  ) {
    const hotelList = await this.hotelService.listHotelByDestinationIdService({
      destinationId,
      ...query,
    });

    return new ListHotelByDestinationIdPresenter(hotelList);
  }
}
