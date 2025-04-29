import {
  CreateHotelRepositoryInputInterface,
  CreateHotelRepositoryOutputInterface,
  ListHotelByDestinationIdRepositoryInputInterface,
  ListHotelByDestinationIdRepositoryOutputInterface,
} from './hotel.repository.interface';

export abstract class HotelRepository {
  abstract createHotel(
    data: CreateHotelRepositoryInputInterface,
  ): Promise<CreateHotelRepositoryOutputInterface>;

  abstract listHotelByDestinationId(
    data: ListHotelByDestinationIdRepositoryInputInterface,
  ): Promise<{
    hotel: ListHotelByDestinationIdRepositoryOutputInterface[] | null;
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  }>;
}
