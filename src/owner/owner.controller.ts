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
import { OwnerService } from './owner.service';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';

@Controller('owner')
export class OwnerController {
  constructor(private readonly ownerService: OwnerService) {}

  @Post(':userId')
  ownAPet(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() { petId, ...ownerData }: CreateOwnerDto,
  ) {
    return this.ownerService.ownAPet(userId, { petId, ...ownerData });
  }

  @Get()
  findAll() {
    return this.ownerService.findAllOwners();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ownerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOwnerDto: UpdateOwnerDto) {
    return this.ownerService.update(+id, updateOwnerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ownerService.remove(+id);
  }
}
