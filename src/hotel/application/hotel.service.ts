import { Injectable, NotFoundException } from '@nestjs/common';
import { HotelRepository } from '../domain/repositories/hotel.repository';
import {
  CreateHotelServiceInputInterface,
  CreateHotelServiceOutputInterface,
  ListHotelByDestinationIdInputInterface,
  ListHotelByDestinationIdOutputInterface,
} from './hotel.service.interface';
import { DestinationRepository } from 'src/shared/repositories/destination.repository';

@Injectable()
export class HotelService {
  constructor(
    private hotelRepository: HotelRepository,
    private destinationRepository: DestinationRepository,
  ) {}

  async createHotelService(
    data: CreateHotelServiceInputInterface,
  ): Promise<CreateHotelServiceOutputInterface> {
    const destination = await this.destinationRepository.findById(
      data.destinationId,
    );

    if (!destination) {
      throw new NotFoundException(`Destination not found.`);
    }

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

    const destination = await this.destinationRepository.findById(
      data.destinationId,
    );

    if (!destination) {
      throw new NotFoundException(`Destination not found.`);
    }

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
