import {
  CreateHotelServiceOutputInterface,
  HotelAddressInterface,
  ListHotelByDestinationIdOutputInterface,
} from '../application/hotel.service.interface';

export class CreateHotelPresenter {
  id: string;
  destinationId: string;

  constructor(hotel: CreateHotelServiceOutputInterface) {
    this.id = hotel.id;
    this.destinationId = hotel.destinationId;
  }
}

export class ListHotelByDestinationIdPresenter {
  hotel: {
    id: string;
    name: string;
    rating: number;
    address: HotelAddressInterface;
  }[];

  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };

  constructor(output: ListHotelByDestinationIdOutputInterface) {
    this.hotel = output.hotel.map((item) => ({
      id: item.id,
      name: item.name,
      rating: Number(item.rating),
      address: item.address,
    }));

    this.pagination = output.pagination;
  }
}
