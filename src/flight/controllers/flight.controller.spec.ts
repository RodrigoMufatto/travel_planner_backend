import { Test, TestingModule } from '@nestjs/testing';
import { FlightController } from './flight.controller';
import { FlightService } from '../application/flight.service';
import { AuthGuard } from 'src/auth/auth.guards';
import { CreateFlightDto, ListFlightByDestinationIdDto } from '../dto/flight.dto';
import { Reflector } from '@nestjs/core';

describe('FlightController', () => {
  let controller: FlightController;
  let service: FlightService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FlightController],
      providers: [
        {
          provide: FlightService,
          useValue: {
            createFlightService: jest.fn(),
            listFlightByDestinationIdService: jest.fn(),
            deleteFlightService: jest.fn(),
          },
        },
        Reflector,
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<FlightController>(FlightController);
    service = module.get<FlightService>(FlightService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create()', () => {
    it('should call service and return presenter', async () => {
      const dto: CreateFlightDto = {
        destinationId: 'dest-id',
        stopNumber: 1,
        nonStop: true,
        duration: '2h',
        price: 1000,
        flights: [
          {
            airlineName: 'ITA Airways',
            carrierCodeAirline: 'AZ',
            originAirport: 'GRU',
            destinationAirport: 'FCO',
            departureDate: '2025-06-01T00:00:00.000Z',
            departureTime: '2025-06-01T14:00:00.000Z',
            arrivalDate: '2025-06-01T00:00:00.000Z',
            arrivalTime: '2025-06-01T22:00:00.000Z',
            order: 1,
          },
        ],
      };

      const mockResponse = {
        id: 'flight-id',
        destinationId: 'dest-id',
      };

      jest
        .spyOn(service, 'createFlightService')
        .mockResolvedValueOnce(mockResponse);

      const result = await controller.create(dto);

      expect(service.createFlightService).toHaveBeenCalledWith(dto);
      expect(result).toEqual(expect.any(Object));
    });
  });

  describe('listFlightByDestinationId()', () => {
    it('should call service and return flight list', async () => {
      const destinationId = 'dest-id';
      const query: ListFlightByDestinationIdDto = {
        page: '1',
        limit: '10',
      };

      const mockList = {
        flights: [],
        pagination: {
          page: 1,
          limit: 10,
          total: 0,
          totalPages: 1,
        },
      };

      jest
        .spyOn(service, 'listFlightByDestinationIdService')
        .mockResolvedValueOnce(mockList);

      const result = await controller.listFlightByDestinationId(destinationId, query);

      expect(service.listFlightByDestinationIdService).toHaveBeenCalledWith({
        destinationId,
        ...query,
      });

      expect(result).toEqual(expect.any(Object));
    });
  });

  describe('deleteFlightById()', () => {
    it('should call service and return 204 status', async () => {
      const flightId = 'flight-id';

      jest
        .spyOn(service, 'deleteFlightService')
        .mockResolvedValueOnce(undefined);

      const result = await controller.deleteFlightById(flightId);

      expect(service.deleteFlightService).toHaveBeenCalledWith(flightId);
      expect(result).toEqual({ statusCode: 204 });
    });
  });
});
