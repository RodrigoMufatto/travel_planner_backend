import { CreateActivityServiceOutputInterface } from '../application/activity.service.interface';

export class CreateActivityPresenter {
  id: string;
  destinationId: string;

  constructor(activity: CreateActivityServiceOutputInterface) {
    this.id = activity.id;
    this.destinationId = activity.destinationId;
  }
}
