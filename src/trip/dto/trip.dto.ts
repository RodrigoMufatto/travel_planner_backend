import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsNumberString,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

class DestinationDto {
  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsString()
  country: string;

  @IsString()
  latitude: string;

  @IsString()
  longitude: string;

  @IsString()
  placeId: string;
}

class UserTripsDto {
  @IsUUID()
  userId: string;
}

export class CreateTripDto {
  @IsString()
  title: string;

  @ValidateNested()
  @Type(() => UserTripsDto)
  userTrips: UserTripsDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DestinationDto)
  destination: DestinationDto[];
}

export class ListTripsByUserIdDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsNumberString()
  page?: string;

  @IsOptional()
  @IsNumberString()
  limit?: string;
}
