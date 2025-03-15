import { Transform } from 'class-transformer';
import { IsDate, IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class SignUpDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  username: string;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  birthdate: Date;

  @IsPhoneNumber('BR')
  phone: string;
}

export class SignInDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}