import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UseInterceptors,
} from '@nestjs/common';
import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { Pets } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Post('create-pet/:userId')
  @UseInterceptors(FileInterceptor('file'))
  createPetData(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() createPetDto: CreatePetDto,
  ): Promise<Pets> {
    return this.petsService.create(userId, createPetDto);
  }

  @Get()
  findAll(): Promise<Pets[]> {
    return this.petsService.findAll();
  }

  @Get(':petId')
  findOne(@Param('petId', ParseUUIDPipe) id: string): Promise<Pets> {
    return this.petsService.findOne(id);
  }

  @Patch(':petId')
  update(
    @Param('petId', ParseUUIDPipe) id: string,
    @Body() updatePetDto: UpdatePetDto,
  ): Promise<Pets> {
    return this.petsService.update(id, updatePetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.petsService.removePet(id);
  }
}
