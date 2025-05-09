import { Test, TestingModule } from '@nestjs/testing';
import { ActivityService } from './activity.service';
import { ActivityRepository } from '../domain/repositories/activity.repository';
import { DestinationRepository } from 'src/shared/repositories/destination.repository';
import { NotFoundException } from '@nestjs/common';
import { Decimal } from '@prisma/client/runtime/library';

describe('ActivityService', () => {
  let service: ActivityService;
  let activityRepository: jest.Mocked<ActivityRepository>;
  let destinationRepository: jest.Mocked<DestinationRepository>;

  const mockDestination = {
    id: 'dest-id',
    tripId: 'trip-id',
    city: 'City',
    state: 'State',
    country: 'Country',
    latitude: '0.0000',
    longitude: '0.0000',
    startDate: new Date('2025-06-01'),
    endDate: new Date('2025-06-10'),
    placeId: 'place-id',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ActivityService,
        {
          provide: ActivityRepository,
          useValue: {
            createActivity: jest.fn(),
            listByDestinationId: jest.fn(),
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

    service = module.get<ActivityService>(ActivityService);
    activityRepository = module.get(ActivityRepository);
    destinationRepository = module.get(DestinationRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createActivityService', () => {
    it('should throw if destination not found', async () => {
      destinationRepository.findById.mockResolvedValueOnce(null);

      await expect(
        service.createActivityService({
          title: 'Test Activity',
          description: 'Test',
          destinationId: 'invalid-id',
          startDate: '2025-06-01T10:00:00.000Z',
          endDate: '2025-06-01T12:00:00.000Z',
          cost: 100,
          location: {
            number: '123',
            street: 'Main St',
            city: 'City',
            state: 'State',
            country: 'Country',
            neighborhood: 'Centro',
            zipcode: '12345-000',
          },
        }),
      ).rejects.toThrow(NotFoundException);
    });

    it('should create activity and return minimal response', async () => {
      destinationRepository.findById.mockResolvedValueOnce(mockDestination);

      activityRepository.createActivity.mockResolvedValueOnce({
        id: 'activity-id',
        title: 'Visit Museum',
        description: 'Learn culture',
        startDate: new Date('2025-06-01T10:00:00.000Z'),
        endDate: new Date('2025-06-01T12:00:00.000Z'),
        cost: new Decimal(50),
        destinationId: mockDestination.id,
        addressId: 'address-id',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      });

      const result = await service.createActivityService({
        title: 'Visit Museum',
        description: 'Learn culture',
        destinationId: mockDestination.id,
        startDate: '2025-06-01T10:00:00.000Z',
        endDate: '2025-06-01T12:00:00.000Z',
        cost: 50,
        location: {
          number: '456',
          street: 'Museum Rd',
          city: 'City',
          state: 'State',
          country: 'Country',
          neighborhood: 'Centro',
          zipcode: '12345-000',
        },
      });

      expect(activityRepository.createActivity).toHaveBeenCalled();
      expect(result).toEqual({
        id: 'activity-id',
        destinationId: mockDestination.id,
      });
    });
  });

  describe('listByDestinationIdService', () => {
    it('should throw if destination not found', async () => {
      destinationRepository.findById.mockResolvedValueOnce(null);

      await expect(
        service.listByDestinationIdService({
          destinationId: 'non-existent',
          page: '1',
          limit: '10',
        }),
      ).rejects.toThrow(NotFoundException);
    });

    it('should return list of activities with pagination', async () => {
      destinationRepository.findById.mockResolvedValueOnce(mockDestination);

      activityRepository.listByDestinationId.mockResolvedValueOnce({
        activity: [],
        pagination: {
          page: 1,
          limit: 10,
          total: 0,
          totalPages: 1,
        },
      });

      const result = await service.listByDestinationIdService({
        destinationId: mockDestination.id,
        page: '1',
        limit: '10',
      });

      expect(result).toEqual({
        activity: [],
        pagination: {
          page: 1,
          limit: 10,
          total: 0,
          totalPages: 1,
        },
      });
    });
  });
});
