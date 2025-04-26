import { Module } from '@nestjs/common';
import { RestaurantController } from './controllers/restaurant.controller';
import { RestaurantService } from './application/restaurant.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaRestaurantRepository } from './infra/repositories/prisma-restaurant.repository';
import { RestaurantRepository } from './domain/repositories/restaurant.repository';

@Module({
  controllers: [RestaurantController],
  providers: [
    RestaurantService,
    PrismaService,
    PrismaRestaurantRepository,
    { provide: RestaurantRepository, useClass: PrismaRestaurantRepository },
  ],
})
export class RestaurantModule {}
