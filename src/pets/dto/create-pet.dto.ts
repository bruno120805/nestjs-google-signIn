import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePetDto {
  @ApiProperty({
    example: 'Rex',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'cat',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({
    example: 'egyptian',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  breed: string;

  @ApiProperty({
    example: ['waiting'],
    required: false,
  })
  @IsArray()
  @IsOptional()
  available?: string[];

  @ApiProperty({
    example: 'A lovely cat',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example:
      'https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554__340.jpg',
    required: false,
  })
  @IsString()
  @IsOptional()
  imageUrl: string;
}
