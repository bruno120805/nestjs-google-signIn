import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePetDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  breed: string;

  @IsArray()
  @IsOptional()
  available?: string[];

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsOptional()
  imageUrl: string;
}
