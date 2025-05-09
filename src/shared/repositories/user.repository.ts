import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async findById(UserId: string) {
    return this.prisma.user.findUnique({
      where: { id: UserId },
    });
  }
}
