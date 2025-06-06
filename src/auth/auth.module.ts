import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './application/auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { jwtConstants } from './constants';
import { PrismaAuthRepository } from './infra/repositories/prisma-auth.repository';
import { AuthRepository } from './domain/repositories/auth.repository';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    PrismaService,
    PrismaAuthRepository,
    { provide: AuthRepository, useClass: PrismaAuthRepository },
  ],
})
export class AuthModule {}