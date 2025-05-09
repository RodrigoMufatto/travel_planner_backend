import { Test, TestingModule } from '@nestjs/testing';
import { TripController } from './trip.controller';
import { TripService } from '../application/trip.service';
import { AuthGuard } from 'src/auth/auth.guards';
import { CreateTripDto, ListTripsByUserIdDto } from '../dto/trip.dto';

describe('TripController', () => {
  let controller: TripController;
  let service: TripService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TripController],
      providers: [
        {
          provide: TripService,
          useValue: {
            createTripService: jest.fn(),
            listTripsByUserIdService: jest.fn(),
            deleteTrip: jest.fn(),
            getTripByIdService: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: jest.fn().mockReturnValue(true) })
      .compile();

    controller = module.get<TripController>(TripController);
    service = module.get<TripService>(TripService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createTrip', () => {
    it('should call tripService.createTripService and return presenter', async () => {
      const dto: CreateTripDto = {
        title: 'Trip to Europe',
        userTrips: {
          userId: 'user-id',
        },
        destination: [
          {
            city: 'Paris',
            state: 'Île-de-France',
            country: 'France',
            latitude: '48.8566',
            longitude: '2.3522',
            placeId: 'place-id-paris',
            startDate: '2025-06-01T00:00:00.000Z',
            endDate: '2025-06-10T00:00:00.000Z',
          },
        ],
      };

      const mockTrip = { id: 'trip-id', ...dto };

      jest
        .spyOn(service, 'createTripService')
        .mockResolvedValueOnce(mockTrip as any);

      const result = await controller.createTrip(dto);

      expect(service.createTripService).toHaveBeenCalledWith(dto);
      expect(result).toEqual(expect.any(Object));
    });
  });

  describe('listTripsByUserId', () => {
    it('should call tripService.listTripsByUserIdService and return presenter', async () => {
      const userId = 'user-id';
      const query: ListTripsByUserIdDto = { page: '1', limit: '10' };

      const mockList = {
        trips: [],
        pagination: {
          page: 1,
          limit: 10,
          total: 0,
          totalPages: 1,
        },
      };

      jest
        .spyOn(service, 'listTripsByUserIdService')
        .mockResolvedValueOnce(mockList);

      const result = await controller.listTripsByUserId(userId, query);

      expect(service.listTripsByUserIdService).toHaveBeenCalledWith({
        userId,
        ...query,
      });
      expect(result).toEqual(expect.any(Object));
    });
  });

  describe('deleteTripByTripId', () => {
    it('should call tripService.deleteTrip and return statusCode 204', async () => {
      const tripId = 'trip-id';

      jest.spyOn(service, 'deleteTrip').mockResolvedValueOnce(undefined);

      const result = await controller.deleteTripByTripId(tripId);

      expect(service.deleteTrip).toHaveBeenCalledWith(tripId);
      expect(result).toEqual({ statusCode: 204 });
    });
  });

  describe('getTripById', () => {
    it('should call tripService.getTripByIdService and return presenter', async () => {
      const tripId = 'trip-id';

      const mockTrip = {
        id: tripId,
        title: 'Trip to Japan',
        destinations: [],
      };

      jest.spyOn(service, 'getTripByIdService').mockResolvedValueOnce(mockTrip);

      const result = await controller.getTripById(tripId);

      expect(service.getTripByIdService).toHaveBeenCalledWith(tripId);
      expect(result).toEqual(expect.any(Object));
    });
  });
});
