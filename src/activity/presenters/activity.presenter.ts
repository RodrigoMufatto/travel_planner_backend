import {
  ActivityAddressInterface,
  CreateActivityServiceOutputInterface,
  ListByDestinationIdOutputInterface,
} from '../application/activity.service.interface';

export class CreateActivityPresenter {
  id: string;
  destinationId: string;

  constructor(activity: CreateActivityServiceOutputInterface) {
    this.id = activity.id;
    this.destinationId = activity.destinationId;
  }
}

export class ListByDestinationIdPresenter {
  activity: {
    id: string;
    title: string;
    addressId: string;
    description: string;
    startDate: Date;
    endDate: Date | null;
    cost: number;
    address: ActivityAddressInterface;
  }[];

  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };

  constructor(output: ListByDestinationIdOutputInterface) {
    this.activity = output.activity.map((item) => ({
      id: item.id,
      title: item.title,
      addressId: item.addressId,
      description: item.description || '',
      startDate: item.startDate,
      endDate: item.endDate ? item.endDate : null,
      cost: Number(item.cost),
      address: item.address,
    }));

    this.pagination = output.pagination;
  }
}
