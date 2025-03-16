import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { AuthRepository } from '../../domain/repositories/auth.repository';
import { SignUpDto } from '../../dto/auth.dto';
import { User } from '@prisma/client';
import { v4 as uuid } from 'uuid';

@Injectable()
export class PrismaAuthRepository implements AuthRepository {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async createUser(data: SignUpDto, hashedPassword: string): Promise<User> {
    return this.prisma.user.create({
      data: {
        id: uuid(),
        username: data.username,
        email: data.email,
        password: hashedPassword,
        phone: data.phone,
        birthdate: new Date(data.birthdate),
      },
    });
  }
}
