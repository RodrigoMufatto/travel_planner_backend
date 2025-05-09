import { Test, TestingModule } from '@nestjs/testing';
import { TripService } from './trip.service';
import { TripRepository } from '../domain/repositories/trip.repository';
import { UserRepository } from 'src/shared/repositories/user.repository';
import { NotFoundException } from '@nestjs/common';

describe('TripService', () => {
  let service: TripService;
  let tripRepository: jest.Mocked<TripRepository>;
  let userRepository: jest.Mocked<UserRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TripService,
        {
          provide: TripRepository,
          useValue: {
            createTrip: jest.fn(),
            findTripsByUserId: jest.fn(),
            findTripById: jest.fn(),
            deleteTripByTripId: jest.fn(),
            getTripById: jest.fn(),
          },
        },
        {
          provide: UserRepository,
          useValue: {
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TripService>(TripService);
    tripRepository = module.get(TripRepository);
    userRepository = module.get(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createTripService', () => {
    it('should throw if user not found', async () => {
      userRepository.findById.mockResolvedValueOnce(null);

      await expect(
        service.createTripService({
          title: 'Trip',
          userTrips: { userId: 'user-id' },
          destination: [],
        }),
      ).rejects.toThrow(NotFoundException);
    });

    it('should create trip', async () => {
      userRepository.findById.mockResolvedValueOnce({
        id: 'user-id',
        email: 'user@example.com',
        password: 'hashedpass',
        username: 'User',
        phone: '+550000000000',
        birthdate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      });
      tripRepository.createTrip.mockResolvedValueOnce({
        id: 'trip-id',
        title: 'Trip to Europe',
      });

      const result = await service.createTripService({
        title: 'Trip',
        userTrips: { userId: 'user-id' },
        destination: [
          {
            city: 'City',
            country: 'Country',
            latitude: '1',
            longitude: '2',
            placeId: 'place',
            startDate: '2025-06-01T00:00:00.000Z',
            endDate: '2025-06-02T00:00:00.000Z',
            state: 'State',
          },
        ],
      });

      expect(tripRepository.createTrip).toHaveBeenCalled();
      expect(result).toEqual({
        id: 'trip-id',
        title: 'Trip to Europe',
      });
    });
  });

  describe('listTripsByUserIdService', () => {
    it('should throw if user not found', async () => {
      userRepository.findById.mockResolvedValueOnce(null);

      await expect(
        service.listTripsByUserIdService({
          userId: 'user-id',
          page: '1',
          limit: '10',
        }),
      ).rejects.toThrow(NotFoundException);
    });

    it('should return trips with pagination', async () => {
      userRepository.findById.mockResolvedValueOnce({
        id: 'user-id',
        email: 'user@example.com',
        password: 'hashedpass',
        username: 'User',
        phone: '+550000000000',
        birthdate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      });
      tripRepository.findTripsByUserId.mockResolvedValueOnce({
        trip: [
          {
            id: 'trip-id',
            title: 'Trip',
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
            destinations: [
              {
                id: 'dest-id',
                city: 'City',
                state: 'State',
                country: 'Country',
                startDate: new Date(),
                endDate: new Date(),
              },
            ],
          },
        ],
        pagination: { page: 1, limit: 10, total: 1, totalPages: 1 },
      });

      const result = await service.listTripsByUserIdService({
        userId: 'user-id',
        page: '1',
        limit: '10',
      });

      expect(result.trips.length).toBe(1);
      expect(result.pagination.total).toBe(1);
    });
  });

  describe('deleteTrip', () => {
    it('should throw if trip not found', async () => {
      tripRepository.findTripById.mockResolvedValueOnce(null);

      await expect(service.deleteTrip('trip-id')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should call deleteTripByTripId', async () => {
      tripRepository.findTripById.mockResolvedValueOnce({ id: 'trip-id' });
      tripRepository.deleteTripByTripId.mockResolvedValueOnce(undefined);

      await service.deleteTrip('trip-id');

      expect(tripRepository.deleteTripByTripId).toHaveBeenCalledWith('trip-id');
    });
  });

  describe('getTripByIdService', () => {
    it('should throw if trip not found', async () => {
      tripRepository.findTripById.mockResolvedValueOnce(null);

      await expect(service.getTripByIdService('trip-id')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should return trip', async () => {
      tripRepository.findTripById.mockResolvedValueOnce({ id: 'trip-id' });
      tripRepository.getTripById.mockResolvedValueOnce({
        id: 'trip-id',
        title: 'Trip',
        destinations: [],
      });

      const result = await service.getTripByIdService('trip-id');

      expect(result).toEqual({
        id: 'trip-id',
        title: 'Trip',
        destinations: [],
      });
    });
  });
});
