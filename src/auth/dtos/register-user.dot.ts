import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  name: string;
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(1)
  password: string;
}
