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

class destination {
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

class userTrips {
  @IsUUID()
  userId: string;

  @IsOptional()
  @IsString()
  role?: string;
}

export class CreateTripDto {
  @IsString()
  title: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @ValidateNested()
  @Type(() => userTrips)
  userTrips: userTrips;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => destination)
  destination: destination[];
}

export class listTripsByUserIdDto {
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
