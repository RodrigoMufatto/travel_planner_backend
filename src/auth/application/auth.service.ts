import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDto, SignUpDto } from '../dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from '../domain/repositories/auth.repository';
import {
  SignInServiceInputInterface,
  SignInServiceOutputInterface,
  SignUpServiceInputInterface,
  SignUpServiceOutputInterface,
} from './auth.service.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(
    data: SignUpServiceInputInterface,
  ): Promise<SignUpServiceOutputInterface> {
    const userAlreadyExists = await this.authRepository.findByEmail(data.email);

    if (userAlreadyExists) {
      throw new UnauthorizedException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.authRepository.createUser(
      { ...data, birthdate: new Date(data.birthdate) },
      hashedPassword,
    );

    return {
      id: user.id,
    };
  }

  async signIn(
    data: SignInServiceInputInterface,
  ): Promise<SignInServiceOutputInterface> {
    const user = await this.authRepository.findByEmail(data.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatch = await bcrypt.compare(data.password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = await this.jwtService.sign({
      id: user.id,
      username: user.username,
      phone: user.phone,
      email: user.email,
      birthdate: user.birthdate,
    });

    return { accessToken };
  }
}
