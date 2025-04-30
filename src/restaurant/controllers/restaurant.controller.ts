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
import { RestaurantService } from '../application/restaurant.service';
import { AuthGuard } from 'src/auth/auth.guards';
import {
  CreateRestaurantDto,
  ListRestaurantByDestinationIdDto,
} from '../dto/restaurant.dto';
import {
  CreateRestaurantPresenter,
  ListRestaurantByDestinationIdPresenter,
} from '../presenters/restaurant.presenter';

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

  @UseGuards(AuthGuard)
  @Get('list/:destinationId')
  async listByDestinationId(
    @Param('destinationId') destinationId: string,
    @Query() query: ListRestaurantByDestinationIdDto,
  ) {
    const restaurantList =
      await this.restaurantService.listRestaurantByDestinationIdService({
        destinationId,
        ...query,
      });

    return new ListRestaurantByDestinationIdPresenter(restaurantList);
  }

  @UseGuards(AuthGuard)
  @Delete('delete/:restaurantId')
  async deleteRestaurantById(@Param('restaurantId') restaurantId: string) {
    await this.restaurantService.deleteRestaurantService(restaurantId);

    return { statusCode: 204 };
  }
}
