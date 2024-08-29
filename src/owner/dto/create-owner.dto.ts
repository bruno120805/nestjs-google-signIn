import { IsEmail, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateOwnerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsUUID()
  petId: string;
}
