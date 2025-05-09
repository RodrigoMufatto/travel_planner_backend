import { Test, TestingModule } from '@nestjs/testing';
import { FlightService } from './flight.service';
import { FlightRepository } from '../domain/repositories/flight.repository';
import { DestinationRepository } from 'src/shared/repositories/destination.repository';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('FlightService', () => {
  let service: FlightService;
  let flightRepository: jest.Mocked<FlightRepository>;
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
        FlightService,
        {
          provide: FlightRepository,
          useValue: {
            createFlight: jest.fn(),
            listFlightByDestinationId: jest.fn(),
            findFlightById: jest.fn(),
            deleteFlightById: jest.fn(),
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

    service = module.get<FlightService>(FlightService);
    flightRepository = module.get(FlightRepository);
    destinationRepository = module.get(DestinationRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createFlightService', () => {
    it('should throw if destination not found', async () => {
      destinationRepository.findById.mockResolvedValue(null);

      await expect(
        service.createFlightService({
          destinationId: 'invalid',
          stopNumber: 1,
          nonStop: true,
          duration: '2h',
          price: 500,
          flights: [],
        }),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw if flights is empty', async () => {
      destinationRepository.findById.mockResolvedValue(mockDestination);

      await expect(
        service.createFlightService({
          destinationId: mockDestination.id,
          stopNumber: 1,
          nonStop: true,
          duration: '2h',
          price: 500,
          flights: [],
        }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw if arrival date is before departure date', async () => {
      destinationRepository.findById.mockResolvedValue(mockDestination);

      await expect(
        service.createFlightService({
          destinationId: mockDestination.id,
          stopNumber: 1,
          nonStop: true,
          duration: '2h',
          price: 500,
          flights: [
            {
              airlineName: 'ITA',
              carrierCodeAirline: 'AZ',
              originAirport: 'GRU',
              destinationAirport: 'FCO',
              departureDate: '2025-06-01T10:00:00Z',
              departureTime: '2025-06-01T10:00:00Z',
              arrivalDate: '2025-05-31T10:00:00Z',
              arrivalTime: '2025-05-31T12:00:00Z',
              order: 1,
            },
          ],
        }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should create and return flight', async () => {
      destinationRepository.findById.mockResolvedValue(mockDestination);

      flightRepository.createFlight.mockResolvedValue({
        id: 'flight-id',
        destinationId: mockDestination.id,
      });

      const result = await service.createFlightService({
        destinationId: mockDestination.id,
        stopNumber: 1,
        nonStop: true,
        duration: '2h',
        price: 500,
        flights: [
          {
            airlineName: 'ITA',
            carrierCodeAirline: 'AZ',
            originAirport: 'GRU',
            destinationAirport: 'FCO',
            departureDate: '2025-06-01T10:00:00Z',
            departureTime: '2025-06-01T10:00:00Z',
            arrivalDate: '2025-06-01T14:00:00Z',
            arrivalTime: '2025-06-01T14:00:00Z',
            order: 1,
          },
        ],
      });

      expect(result).toEqual({
        id: 'flight-id',
        destinationId: mockDestination.id,
      });
    });
  });

  describe('listFlightByDestinationIdService', () => {
    it('should throw if destination not found', async () => {
      destinationRepository.findById.mockResolvedValue(null);

      await expect(
        service.listFlightByDestinationIdService({
          destinationId: 'invalid',
          page: '1',
          limit: '4',
        }),
      ).rejects.toThrow(NotFoundException);
    });

    it('should return list of flights with pagination', async () => {
      destinationRepository.findById.mockResolvedValue(mockDestination);

      flightRepository.listFlightByDestinationId.mockResolvedValue({
        flights: [],
        pagination: {
          page: 1,
          limit: 4,
          total: 0,
          totalPages: 1,
        },
      });

      const result = await service.listFlightByDestinationIdService({
        destinationId: mockDestination.id,
        page: '1',
        limit: '4',
      });

      expect(result).toEqual({
        flights: [],
        pagination: {
          page: 1,
          limit: 4,
          total: 0,
          totalPages: 1,
        },
      });
    });
  });

  describe('deleteFlightService', () => {
    it('should throw if flight not found', async () => {
      flightRepository.findFlightById.mockResolvedValue(null);

      await expect(service.deleteFlightService('invalid')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should delete flight if found', async () => {
      flightRepository.findFlightById.mockResolvedValue({
        id: 'flight-id',
        destinationId: 'dest-id',
      });

      flightRepository.deleteFlightById.mockResolvedValue(undefined);

      await expect(
        service.deleteFlightService('flight-id'),
      ).resolves.toBeUndefined();
    });
  });
});
