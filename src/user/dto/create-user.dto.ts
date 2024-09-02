import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'rambutan@gmial.com',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'rambutan',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '2144554',
    required: true,
  })
  @IsString()
  @MinLength(2)
  password: string;
}
