import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
} from 'class-validator';

export class SignUpDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  username: string;

  @IsDateString()
  birthdate: string;

  @IsPhoneNumber('BR')
  phone: string;
}

export class SignInDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
