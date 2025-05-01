import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsNumber,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

class FlightSegmentDto {
  @IsString()
  airlineName: string;

  @IsString()
  carrierCodeAirline: string;

  @IsString()
  originAirport: string;

  @IsString()
  destinationAirport: string;

  @IsDateString()
  departureDate: string;

  @IsDateString()
  departureTime: string;

  @IsDateString()
  arrivalDate: string;

  @IsDateString()
  arrivalTime: string;

  @IsNumber()
  order: number;
}

export class CreateFlightDto {
  @IsUUID()
  destinationId: string;

  @IsNumber()
  stopNumber: number;

  @IsBoolean()
  nonStop: boolean;

  @IsString()
  duration: string;

  @IsNumber()
  price: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FlightSegmentDto)
  flights: FlightSegmentDto[];
}
