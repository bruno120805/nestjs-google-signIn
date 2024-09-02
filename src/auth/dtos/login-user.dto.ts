import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginUser {
  @ApiProperty({
    example: 'anotio@gmail.com',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'anoti32',
    required: true,
  })
  @IsString()
  @MinLength(2)
  password: string;
}
