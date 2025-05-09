import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantService } from './restaurant.service';
import { RestaurantRepository } from '../domain/repositories/restaurant.repository';
import { DestinationRepository } from 'src/shared/repositories/destination.repository';
import { NotFoundException } from '@nestjs/common';

describe('RestaurantService', () => {
  let service: RestaurantService;
  let restaurantRepository: jest.Mocked<RestaurantRepository>;
  let destinationRepository: jest.Mocked<DestinationRepository>;

  const mockDestination = {
    id: 'dest-id',
    tripId: 'trip-id',
    city: 'Cidade',
    state: 'Estado',
    country: 'Brasil',
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
        RestaurantService,
        {
          provide: RestaurantRepository,
          useValue: {
            createRestaurant: jest.fn(),
            listRestaurantByDestinationId: jest.fn(),
            findRestaurantById: jest.fn(),
            deleteRestaurantById: jest.fn(),
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

    service = module.get(RestaurantService);
    restaurantRepository = module.get(RestaurantRepository);
    destinationRepository = module.get(DestinationRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createRestaurantService', () => {
    it('should throw if destination not found', async () => {
      destinationRepository.findById.mockResolvedValueOnce(null);

      await expect(
        service.createRestaurantService({
          name: 'Restaurante X',
          priceLevel: 3,
          rating: '4.5',
          destinationId: 'invalid-id',
          address: {
            number: '123',
            street: 'Rua A',
            neighborhood: 'Centro',
            city: 'Cidade',
            state: 'Estado',
            country: 'Brasil',
            zipcode: '12345-000',
          },
        }),
      ).rejects.toThrow(NotFoundException);
    });

    it('should create restaurant and return id/destinationId', async () => {
      destinationRepository.findById.mockResolvedValueOnce(mockDestination);
      restaurantRepository.createRestaurant.mockResolvedValueOnce({
        id: 'restaurant-id',
        destinationId: mockDestination.id,
      });

      const result = await service.createRestaurantService({
        name: 'Restaurante Y',
        priceLevel: 2,
        rating: '4.2',
        destinationId: mockDestination.id,
        address: {
          number: '999',
          street: 'Av B',
          neighborhood: 'Bairro',
          city: 'Cidade',
          state: 'Estado',
          country: 'Brasil',
          zipcode: '00000-000',
        },
      });

      expect(result).toEqual({
        id: 'restaurant-id',
        destinationId: mockDestination.id,
      });
    });
  });

  describe('listRestaurantByDestinationIdService', () => {
    it('should throw if destination not found', async () => {
      destinationRepository.findById.mockResolvedValueOnce(null);

      await expect(
        service.listRestaurantByDestinationIdService({
          destinationId: 'invalid-id',
          page: '1',
          limit: '4',
        }),
      ).rejects.toThrow(NotFoundException);
    });

    it('should return list and pagination', async () => {
      destinationRepository.findById.mockResolvedValueOnce(mockDestination);
      restaurantRepository.listRestaurantByDestinationId.mockResolvedValueOnce({
        restaurant: [],
        pagination: {
          page: 1,
          limit: 4,
          total: 0,
          totalPages: 1,
        },
      });

      const result = await service.listRestaurantByDestinationIdService({
        destinationId: mockDestination.id,
        page: '1',
        limit: '4',
      });

      expect(result).toEqual({
        restaurant: [],
        pagination: {
          page: 1,
          limit: 4,
          total: 0,
          totalPages: 1,
        },
      });
    });
  });

  describe('deleteRestaurantService', () => {
    it('should throw if restaurant not found', async () => {
      restaurantRepository.findRestaurantById.mockResolvedValueOnce(null);

      await expect(
        service.deleteRestaurantService('invalid-id'),
      ).rejects.toThrow(NotFoundException);
    });

    it('should call delete if found', async () => {
      restaurantRepository.findRestaurantById.mockResolvedValueOnce({
        id: 'rest-id',
        destinationId: mockDestination.id,
      });

      restaurantRepository.deleteRestaurantById.mockResolvedValueOnce(undefined);

      await service.deleteRestaurantService('rest-id');

      expect(restaurantRepository.deleteRestaurantById).toHaveBeenCalledWith('rest-id');
    });
  });
});
