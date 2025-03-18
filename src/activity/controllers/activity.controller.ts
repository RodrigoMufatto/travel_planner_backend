import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ActivityService } from '../application/activity.service';
import { AuthGuard } from 'src/auth/auth.guards';
import { CreateActivityDto } from '../dto/activity.dto';
import { CreateActivityPresenter } from '../presenters/activity.presenter';

@Controller('activity')
export class ActivityController {
  constructor(private activityService: ActivityService) {}

  @UseGuards(AuthGuard)
  @Post('create')
  async createTrip(@Body() body: CreateActivityDto) {
    const activity = await this.activityService.createActivityService(body);

    return new CreateActivityPresenter(activity);
  }
}
