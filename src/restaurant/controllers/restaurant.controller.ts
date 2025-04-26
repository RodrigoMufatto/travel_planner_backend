import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { RestaurantService } from '../application/restaurant.service';
import { AuthGuard } from 'src/auth/auth.guards';
import { CreateRestaurantDto } from '../dto/restaurant.dto';
import { CreateRestaurantPresenter } from '../presenters/restaurant.presenter';

@Controller('restaurant')
export class RestaurantController {
  constructor(private restaurantService: RestaurantService) {}

  @UseGuards(AuthGuard)
  @Post('create')
  async create(@Body() body: CreateRestaurantDto) {
    const restaurant =
      await this.restaurantService.createRestaurantService(body);

    return new CreateRestaurantPresenter(restaurant);
  }
}
