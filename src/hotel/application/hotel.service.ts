import { Injectable, NotFoundException } from '@nestjs/common';
import { HotelRepository } from '../domain/repositories/hotel.repository';
import {
  CreateHotelServiceInputInterface,
  CreateHotelServiceOutputInterface,
  ListHotelByDestinationIdInputInterface,
  ListHotelByDestinationIdOutputInterface,
} from './hotel.service.interface';

@Injectable()
export class HotelService {
  constructor(private hotelRepository: HotelRepository) {}

  async createHotelService(
    data: CreateHotelServiceInputInterface,
  ): Promise<CreateHotelServiceOutputInterface> {
    const hotel = await this.hotelRepository.createHotel({
      ...data,
    });

    return {
      id: hotel.id,
      destinationId: hotel.destinationId,
    };
  }

  async listHotelByDestinationIdService(
    data: ListHotelByDestinationIdInputInterface,
  ): Promise<ListHotelByDestinationIdOutputInterface> {
    const page = data.page ? Number(data.page) : 1;
    const limit = data.limit ? Number(data.limit) : 4;
    const skip = (page - 1) * limit;

    const restaurantList = await this.hotelRepository.listHotelByDestinationId({
      skip,
      limit,
      destinationId: data.destinationId,
    });

    return {
      hotel: restaurantList.hotel,
      pagination: restaurantList.pagination,
    };
  }

  async deleteHotelService(hotelId: string) {
    const hotel = await this.hotelRepository.findHotelById(hotelId);

    if (!hotel) {
      throw new NotFoundException(`Hotel not found`);
    }

    await this.hotelRepository.deleteHotelById(hotelId);
  }
}
