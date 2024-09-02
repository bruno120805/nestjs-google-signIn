import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginUser {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(2)
  password: string;
}
