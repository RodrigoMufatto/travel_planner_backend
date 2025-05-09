import { Test, TestingModule } from '@nestjs/testing';
import { HotelService } from './hotel.service';
import { HotelRepository } from '../domain/repositories/hotel.repository';
import { DestinationRepository } from 'src/shared/repositories/destination.repository';
import { NotFoundException } from '@nestjs/common';

describe('HotelService', () => {
  let service: HotelService;
  let hotelRepository: jest.Mocked<HotelRepository>;
  let destinationRepository: jest.Mocked<DestinationRepository>;

  const mockDestination = {
    id: 'dest-id',
    tripId: 'trip-id',
    city: 'City',
    state: 'State',
    country: 'Country',
    latitude: '0',
    longitude: '0',
    startDate: new Date(),
    endDate: new Date(),
    placeId: 'place-id',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HotelService,
        {
          provide: HotelRepository,
          useValue: {
            createHotel: jest.fn(),
            listHotelByDestinationId: jest.fn(),
            findHotelById: jest.fn(),
            deleteHotelById: jest.fn(),
          },
        },
        {
          provide: DestinationRepository,
          useValue: {
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<HotelService>(HotelService);
    hotelRepository = module.get(HotelRepository);
    destinationRepository = module.get(DestinationRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createHotelService', () => {
    it('should throw if destination not found', async () => {
      destinationRepository.findById.mockResolvedValueOnce(null);

      await expect(
        service.createHotelService({
          name: 'Hotel Luxo',
          rating: '4.5',
          destinationId: 'invalid-id',
          address: {
            number: '123',
            street: 'Rua X',
            neighborhood: 'Bairro',
            city: 'Cidade',
            state: 'Estado',
            country: 'País',
            zipcode: '12345-000',
          },
        }),
      ).rejects.toThrow(NotFoundException);
    });

    it('should create and return hotel info', async () => {
      destinationRepository.findById.mockResolvedValueOnce(mockDestination);

      hotelRepository.createHotel.mockResolvedValueOnce({
        id: 'hotel-id',
        destinationId: mockDestination.id,
      });

      const result = await service.createHotelService({
        name: 'Hotel Luxo',
        rating: '4.5',
        destinationId: mockDestination.id,
        address: {
          number: '123',
          street: 'Rua X',
          neighborhood: 'Bairro',
          city: 'Cidade',
          state: 'Estado',
          country: 'País',
          zipcode: '12345-000',
        },
      });

      expect(result).toEqual({
        id: 'hotel-id',
        destinationId: mockDestination.id,
      });
    });
  });

  describe('listHotelByDestinationIdService', () => {
    it('should throw if destination not found', async () => {
      destinationRepository.findById.mockResolvedValueOnce(null);

      await expect(
        service.listHotelByDestinationIdService({
          destinationId: 'non-existent',
          page: '1',
          limit: '5',
        }),
      ).rejects.toThrow(NotFoundException);
    });

    it('should return hotel list and pagination', async () => {
      destinationRepository.findById.mockResolvedValueOnce(mockDestination);

      hotelRepository.listHotelByDestinationId.mockResolvedValueOnce({
        hotel: [],
        pagination: {
          page: 1,
          limit: 5,
          total: 0,
          totalPages: 1,
        },
      });

      const result = await service.listHotelByDestinationIdService({
        destinationId: mockDestination.id,
        page: '1',
        limit: '5',
      });

      expect(result).toEqual({
        hotel: [],
        pagination: {
          page: 1,
          limit: 5,
          total: 0,
          totalPages: 1,
        },
      });
    });
  });

  describe('deleteHotelService', () => {
    it('should throw if hotel not found', async () => {
      hotelRepository.findHotelById.mockResolvedValueOnce(null);

      await expect(service.deleteHotelService('invalid-id')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should call deleteHotelById', async () => {
      hotelRepository.findHotelById.mockResolvedValueOnce({
        id: 'hotel-id',
      });

      hotelRepository.deleteHotelById.mockResolvedValueOnce(undefined);

      await service.deleteHotelService('hotel-id');

      expect(hotelRepository.deleteHotelById).toHaveBeenCalledWith('hotel-id');
    });
  });
});
