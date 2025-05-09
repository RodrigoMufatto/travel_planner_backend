import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { AuthRepository } from '../domain/repositories/auth.repository';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

const mockUser = () => ({
  id: 'user-id',
  email: 'user@example.com',
  password: 'hashed-password',
  username: 'tester',
  phone: '+5561999999999',
  birthdate: new Date('1995-01-01'),
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
});

describe('AuthService', () => {
  let service: AuthService;
  let authRepository: jest.Mocked<AuthRepository>;
  let jwtService: jest.Mocked<JwtService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: AuthRepository,
          useValue: {
            findByEmail: jest.fn(),
            createUser: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    authRepository = module.get(AuthRepository);
    jwtService = module.get(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signUp()', () => {
    it('should throw if user already exists', async () => {
      authRepository.findByEmail.mockResolvedValueOnce(mockUser());

      await expect(
        service.signUp({
          email: 'test@example.com',
          password: '123456',
          username: 'tester',
          phone: '+5561999999999',
          birthdate: '1995-01-01T00:00:00.000Z',
        }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should create user and return id', async () => {
      authRepository.findByEmail.mockResolvedValueOnce(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashed-password');
      authRepository.createUser.mockResolvedValueOnce({
        ...mockUser(),
        id: 'new-user-id',
      });

      const result = await service.signUp({
        email: 'test@example.com',
        password: '123456',
        username: 'tester',
        phone: '+5561999999999',
        birthdate: '1995-01-01T00:00:00.000Z',
      });

      expect(authRepository.createUser).toHaveBeenCalled();
      expect(result).toEqual({ id: 'new-user-id' });
    });
  });

  describe('signIn()', () => {
    it('should throw if user is not found', async () => {
      authRepository.findByEmail.mockResolvedValueOnce(null);

      await expect(
        service.signIn({
          email: 'notfound@example.com',
          password: 'wrong',
        }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw if password does not match', async () => {
      authRepository.findByEmail.mockResolvedValueOnce(mockUser());
      (bcrypt.compare as jest.Mock).mockResolvedValueOnce(false);

      await expect(
        service.signIn({
          email: 'user@example.com',
          password: 'wrong',
        }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should return token if credentials are valid', async () => {
      authRepository.findByEmail.mockResolvedValueOnce(mockUser());
      (bcrypt.compare as jest.Mock).mockResolvedValueOnce(true);
      jwtService.sign.mockReturnValueOnce('valid.jwt.token');

      const result = await service.signIn({
        email: 'user@example.com',
        password: '123456',
      });

      expect(jwtService.sign).toHaveBeenCalled();
      expect(result).toEqual({ accessToken: 'valid.jwt.token' });
    });
  });
});
