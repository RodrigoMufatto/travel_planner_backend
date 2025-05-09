import { Test, TestingModule } from '@nestjs/testing';
import { ActivityController } from './activity.controller';
import { ActivityService } from '../application/activity.service';
import { CreateActivityDto, ListByDestinationIdDto } from '../dto/activity.dto';
import { AuthGuard } from 'src/auth/auth.guards';
import { Reflector } from '@nestjs/core';

describe('ActivityController', () => {
  let controller: ActivityController;
  let service: ActivityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActivityController],
      providers: [
        {
          provide: ActivityService,
          useValue: {
            createActivityService: jest.fn(),
            listByDestinationIdService: jest.fn(),
          },
        },
        Reflector,
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: jest.fn().mockReturnValue(true) })
      .compile();

    controller = module.get<ActivityController>(ActivityController);
    service = module.get<ActivityService>(ActivityService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create()', () => {
    it('should call service and return a presenter', async () => {
      const dto: CreateActivityDto = {
        title: 'Visit museum',
        description: 'Cultural visit',
        destinationId: 'dest-id',
        startDate: '2025-06-01T10:00:00Z',
        endDate: '2025-06-01T12:00:00Z',
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
      };

      const mockResponse = { id: 'activity-id', ...dto };

      jest
        .spyOn(service, 'createActivityService')
        .mockResolvedValueOnce(mockResponse as any);

      const result = await controller.create(dto);

      expect(service.createActivityService).toHaveBeenCalledWith(dto);
      expect(result).toEqual(expect.any(Object)); // ou use `toMatchObject(mockResponse)` se quiser mais rigidez
    });
  });

  describe('listByDestinationId()', () => {
    it('should call service and return list presenter', async () => {
      const destinationId = 'dest-id';
      const query: ListByDestinationIdDto = { page: '0', limit: '10' };

      const mockResponse = {
        activity: [],
        pagination: {
          page: 1,
          limit: 10,
          total: 0,
          totalPages: 1,
        },
      };

      jest
        .spyOn(service, 'listByDestinationIdService')
        .mockResolvedValueOnce(mockResponse);

      const result = await controller.listByDestinationId(destinationId, query);

      expect(service.listByDestinationIdService).toHaveBeenCalledWith({
        ...query,
        destinationId,
      });
      expect(result).toEqual(expect.any(Object));
    });
  });
});
