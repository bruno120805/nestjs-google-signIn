import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { Pets } from '@prisma/client';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('Pets')
@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Post('create-pet/:userId')
  @ApiOperation({ summary: 'Create a new pet' })
  @ApiResponse({
    status: 201,
  })
  @ApiBody({
    type: CreatePetDto,
    description: 'JSON object representing the user to be created',
  })
  createPetData(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() createPetDto: CreatePetDto,
  ): Promise<Pets> {
    return this.petsService.create(userId, createPetDto);
  }

  @Get()
  @ApiOperation({ summary: 'find all pets' })
  findAll(): Promise<Pets[]> {
    return this.petsService.findAll();
  }

  @Get(':petId')
  @ApiOperation({ summary: 'find one pet' })
  findOne(@Param('petId', ParseUUIDPipe) id: string): Promise<Pets> {
    return this.petsService.findOne(id);
  }

  @Patch(':petId')
  @ApiOperation({ summary: 'Update a pet data' })
  @ApiResponse({
    status: 201,
  })
  @ApiBody({
    type: UpdatePetDto,
    description: 'JSON object representing the user to be created',
  })
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
