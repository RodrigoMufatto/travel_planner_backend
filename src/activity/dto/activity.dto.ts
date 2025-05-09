import { Type } from 'class-transformer';
import {
  IsDateString,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

class AddressDto {
  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsString()
  country: string;

  @IsString()
  number: string;

  @IsString()
  neighborhood: string;

  @IsString()
  street: string;

  @IsString()
  zipcode: string;
}

export class CreateActivityDto {
  @IsUUID()
  destinationId: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @ValidateNested()
  @Type(() => AddressDto)
  location: AddressDto;

  @IsOptional()
  @IsNumber()
  cost: number;
}

export class ListByDestinationIdDto {
  @IsOptional()
  @IsNumberString()
  page?: string;

  @IsOptional()
  @IsNumberString()
  limit?: string;
}