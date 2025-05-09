import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantController } from './restaurant.controller';
import { RestaurantService } from '../application/restaurant.service';
import { AuthGuard } from 'src/auth/auth.guards';
import { CreateRestaurantDto, ListRestaurantByDestinationIdDto } from '../dto/restaurant.dto';

describe('RestaurantController', () => {
  let controller: RestaurantController;
  let service: RestaurantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RestaurantController],
      providers: [
        {
          provide: RestaurantService,
          useValue: {
            createRestaurantService: jest.fn(),
            listRestaurantByDestinationIdService: jest.fn(),
            deleteRestaurantService: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<RestaurantController>(RestaurantController);
    service = module.get<RestaurantService>(RestaurantService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create()', () => {
    it('should call service and return a presenter', async () => {
      const dto: CreateRestaurantDto = {
        name: 'Restaurante X',
        priceLevel: 3,
        rating: '4.5',
        destinationId: 'dest-id',
        address: {
          number: '100',
          street: 'Rua ABC',
          neighborhood: 'Centro',
          city: 'Cidade',
          state: 'Estado',
          country: 'Brasil',
          zipcode: '12345-000',
        },
      };

      const mockResponse = { id: 'restaurant-id', destinationId: dto.destinationId };

      jest
        .spyOn(service, 'createRestaurantService')
        .mockResolvedValueOnce(mockResponse);

      const result = await controller.create(dto);

      expect(service.createRestaurantService).toHaveBeenCalledWith(dto);
      expect(result).toEqual(expect.any(Object));
    });
  });

  describe('listByDestinationId()', () => {
    it('should call service and return presenter', async () => {
      const destinationId = 'dest-id';
      const query: ListRestaurantByDestinationIdDto = { page: '1', limit: '5' };

      const mockResponse = {
        restaurant: [],
        pagination: {
          page: 1,
          limit: 5,
          total: 0,
          totalPages: 1,
        },
      };

      jest
        .spyOn(service, 'listRestaurantByDestinationIdService')
        .mockResolvedValueOnce(mockResponse);

      const result = await controller.listByDestinationId(destinationId, query);

      expect(service.listRestaurantByDestinationIdService).toHaveBeenCalledWith({
        destinationId,
        ...query,
      });
      expect(result).toEqual(expect.any(Object));
    });
  });

  describe('deleteRestaurantById()', () => {
    it('should call service and return 204 status', async () => {
      jest.spyOn(service, 'deleteRestaurantService').mockResolvedValueOnce(undefined);

      const result = await controller.deleteRestaurantById('restaurant-id');

      expect(service.deleteRestaurantService).toHaveBeenCalledWith('restaurant-id');
      expect(result).toEqual({ statusCode: 204 });
    });
  });
});
