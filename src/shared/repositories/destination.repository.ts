import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DestinationRepository {
  constructor(private prisma: PrismaService) {}

  async findById(destinationId: string) {
    return this.prisma.destination.findUnique({
      where: { id: destinationId },
    });
  }
}
