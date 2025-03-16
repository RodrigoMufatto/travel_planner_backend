import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { TripModule } from './trip/trip.module';

@Module({
  imports: [PrismaModule, AuthModule, TripModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
