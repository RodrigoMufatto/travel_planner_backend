import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { TripModule } from './trip/trip.module';
import { ActivityModule } from './activity/activity.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { HotelModule } from './hotel/hotel.module';
import { FlightModule } from './flight/flight.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    TripModule,
    ActivityModule,
    RestaurantModule,
    HotelModule,
    FlightModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
