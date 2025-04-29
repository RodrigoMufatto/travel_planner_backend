import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { HotelService } from '../application/hotel.service';
import { AuthGuard } from 'src/auth/auth.guards';
import { CreateHotelDto } from '../dto/hotel.dto';
import { CreateHotelPresenter } from '../presenters/hotel.presenter';

@Controller('hotel')
export class HotelController {
  constructor(private hotelService: HotelService) {}

  @UseGuards(AuthGuard)
  @Post('create')
  async create(@Body() body: CreateHotelDto) {
    const hotel = await this.hotelService.createHotelService(body);

    return new CreateHotelPresenter(hotel);
  }
}
