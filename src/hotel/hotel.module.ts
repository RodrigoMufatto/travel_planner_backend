import { Module } from '@nestjs/common';
import { HotelService } from './application/hotel.service';
import { HotelController } from './controllers/hotel.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaHotelRepository } from './infra/repositories/prisma-hotel.repository';
import { HotelRepository } from './domain/repositories/hotel.repository';
import { RepositoriesModule } from 'src/shared/repositories/repositories.module';

@Module({
  imports: [RepositoriesModule],
  controllers: [HotelController],
  providers: [
    HotelService,
    PrismaService,
    PrismaHotelRepository,
    { provide: HotelRepository, useClass: PrismaHotelRepository },
  ],
})
export class HotelModule {}
