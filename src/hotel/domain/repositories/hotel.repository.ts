import {
  CreateHotelRepositoryInputInterface,
  CreateHotelRepositoryOutputInterface,
} from './hotel.repository.interface';

export abstract class HotelRepository {
  abstract createHotel(
    data: CreateHotelRepositoryInputInterface,
  ): Promise<CreateHotelRepositoryOutputInterface>;
}
