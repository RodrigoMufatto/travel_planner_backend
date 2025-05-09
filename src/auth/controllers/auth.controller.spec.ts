import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from '../application/auth.service';
import { SignInDto, SignUpDto } from '../dto/auth.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signUp: jest.fn(),
            signIn: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('signUp()', () => {
    it('should call AuthService.signUp and return a presenter', async () => {
      const dto: SignUpDto = {
        email: 'john@example.com',
        password: 'securePassword123',
        username: 'john_doe',
        birthdate: '1990-01-01T00:00:00.000Z',
        phone: '+5561999999999',
      };

      const mockResponse = {
        id: 'user-id',
        email: dto.email,
        username: dto.username,
        token: 'jwt-token',
      };

      jest.spyOn(service, 'signUp').mockResolvedValueOnce(mockResponse as any);

      const result = await controller.signUp(dto);

      expect(service.signUp).toHaveBeenCalledWith(dto);
      expect(result).toEqual(expect.any(Object));
    });
  });

  describe('signIn()', () => {
    it('should call AuthService.signIn and return a presenter', async () => {
      const dto: SignInDto = {
        email: 'john@example.com',
        password: 'securePassword123',
      };

      const mockResponse = {
        id: 'user-id',
        email: dto.email,
        token: 'jwt-token',
      };

      jest.spyOn(service, 'signIn').mockResolvedValueOnce(mockResponse as any);

      const result = await controller.signIn(dto);

      expect(service.signIn).toHaveBeenCalledWith(dto);
      expect(result).toEqual(expect.any(Object));
    });
  });
});
