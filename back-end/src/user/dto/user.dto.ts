import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
} from 'class-validator';

export class AddressDto {
  @IsNotEmpty()
  @IsNumber()
  zipcode: number;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsString()
  @IsNumber()
  city: string;

  @IsString()
  @IsNumber()
  street: string;

  @IsNotEmpty()
  @IsNumber()
  number: number;

  @IsNotEmpty()
  @IsNumber()
  floor: number;

  @IsString()
  @IsNumber()
  door: string;
}
export class UserDto {
  _id: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,15}$/)
  password: string;

  @IsNotEmpty()
  @IsString()
  role: string;

  @IsNotEmpty()
  @Type(() => AddressDto)
  address: AddressDto;
}

export class UserResponse {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  role: string;

  @IsNotEmpty()
  @Type(() => AddressDto)
  address: AddressDto;
}
