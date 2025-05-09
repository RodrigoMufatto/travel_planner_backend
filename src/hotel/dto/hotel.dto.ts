import { Type } from 'class-transformer';
import {
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

export class CreateHotelDto {
  @IsUUID()
  destinationId: string;

  @IsString()
  name: string;

  @IsString()
  rating: string;

  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;
}

export class ListHotelByDestinationIdDto {
  @IsOptional()
  @IsNumberString()
  page?: string;

  @IsOptional()
  @IsNumberString()
  limit?: string;
}