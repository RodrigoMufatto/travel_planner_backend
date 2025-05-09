import { Test, TestingModule } from '@nestjs/testing';
import { HotelController } from './hotel.controller';
import { HotelService } from '../application/hotel.service';
import { AuthGuard } from 'src/auth/auth.guards';
import { CreateHotelDto, ListHotelByDestinationIdDto } from '../dto/hotel.dto';
import { Reflector } from '@nestjs/core';

describe('HotelController', () => {
  let controller: HotelController;
  let service: HotelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HotelController],
      providers: [
        {
          provide: HotelService,
          useValue: {
            createHotelService: jest.fn(),
            listHotelByDestinationIdService: jest.fn(),
            deleteHotelService: jest.fn(),
          },
        },
        Reflector,
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<HotelController>(HotelController);
    service = module.get<HotelService>(HotelService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create()', () => {
    it('should call service and return presenter', async () => {
      const dto: CreateHotelDto = {
        name: 'Hotel Luxo',
        rating: '4.5',
        destinationId: 'dest-id',
        address: {
          number: '123',
          street: 'Rua das Flores',
          neighborhood: 'Centro',
          city: 'Cidade',
          state: 'Estado',
          country: 'País',
          zipcode: '12345-000',
        },
      };

      const mockResponse = {
        id: 'hotel-id',
        destinationId: dto.destinationId,
      };

      jest
        .spyOn(service, 'createHotelService')
        .mockResolvedValueOnce(mockResponse);

      const result = await controller.create(dto);

      expect(service.createHotelService).toHaveBeenCalledWith(dto);
      expect(result).toEqual(expect.any(Object));
    });
  });

  describe('listByDestinationId()', () => {
    it('should call service and return hotel list', async () => {
      const destinationId = 'dest-id';
      const query: ListHotelByDestinationIdDto = { page: '1', limit: '5' };

      const mockResponse = {
        hotel: [],
        pagination: {
          page: 1,
          limit: 5,
          total: 0,
          totalPages: 1,
        },
      };

      jest
        .spyOn(service, 'listHotelByDestinationIdService')
        .mockResolvedValueOnce(mockResponse);

      const result = await controller.listByDestinationId(destinationId, query);

      expect(service.listHotelByDestinationIdService).toHaveBeenCalledWith({
        destinationId,
        ...query,
      });

      expect(result).toEqual(expect.any(Object));
    });
  });

  describe('deleteHotelById()', () => {
    it('should call service and return 204', async () => {
      jest
        .spyOn(service, 'deleteHotelService')
        .mockResolvedValueOnce(undefined);

      const result = await controller.deleteHotelById('hotel-id');

      expect(service.deleteHotelService).toHaveBeenCalledWith('hotel-id');
      expect(result).toEqual({ statusCode: 204 });
    });
  });
});
