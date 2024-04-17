import { IsEmail, IsNotEmpty } from 'class-validator';

export default class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
