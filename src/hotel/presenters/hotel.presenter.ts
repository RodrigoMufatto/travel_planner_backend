import { CreateHotelServiceOutputInterface } from '../application/hotel.service.interface';

export class CreateHotelPresenter {
  id: string;
  destinationId: string;

  constructor(hotel: CreateHotelServiceOutputInterface) {
    this.id = hotel.id;
    this.destinationId = hotel.destinationId;
  }
}
