import { Injectable } from '@nestjs/common';
import { HotelRepository } from '../domain/repositories/hotel.repository';
import {
  CreateHotelServiceInputInterface,
  CreateHotelServiceOutputInterface,
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
}
