import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Pets } from '@prisma/client';

@Injectable()
export class PetsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, createPetDto: CreatePetDto): Promise<Pets> {
    const { name, type, breed, description, available } = createPetDto;

    return this.prisma.pets.create({
      data: {
        name,
        type,
        breed,
        description,
        available,
        imageUrl: createPetDto.imageUrl,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  findAll(): Promise<Pets[]> {
    return this.prisma.pets.findMany({
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
    });
  }

  async findOne(id: string): Promise<Pets> {
    try {
      const pet = await this.prisma.pets.findUnique({
        where: { id },
      });

      if (!pet) throw new NotFoundException(`Pet with ${id} not found`);

      return pet;
    } catch (error) {
      console.log({ error });
      throw new InternalServerErrorException();
    }
  }

  async update(id: string, updatePetDto: UpdatePetDto): Promise<Pets> {
    try {
      await this.findOne(id);

      const updatedPet = await this.prisma.pets.update({
        where: { id },
        data: {
          ...updatePetDto,
        },
      });

      return updatedPet;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async removePet(id: string): Promise<Pets> {
    await this.findOne(id);

    return this.prisma.pets.delete({
      where: { id },
    });
  }
}
