import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ActivityService } from '../application/activity.service';
import { AuthGuard } from 'src/auth/auth.guards';
import { CreateActivityDto, ListByDestinationIdDto } from '../dto/activity.dto';
import {
  CreateActivityPresenter,
  ListByDestinationIdPresenter,
} from '../presenters/activity.presenter';

@Controller('activity')
export class ActivityController {
  constructor(private activityService: ActivityService) {}

  @UseGuards(AuthGuard)
  @Post('create')
  async create(@Body() body: CreateActivityDto) {
    const activity = await this.activityService.createActivityService(body);

    return new CreateActivityPresenter(activity);
  }

  @UseGuards(AuthGuard)
  @Get('list/:destinationId')
  async listByDestinationId(
    @Param('destinationId') destinationId: string,
    @Query() query: ListByDestinationIdDto,
  ) {
    const list = await this.activityService.listByDestinationIdService({
      ...query,
      destinationId,
    });

    return new ListByDestinationIdPresenter(list);
  }
}
