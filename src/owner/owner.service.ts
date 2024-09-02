import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AvailablePets } from './enums/available.enum';
import { UserInCharge } from '@prisma/client';

@Injectable()
export class OwnerService {
  constructor(private readonly prisma: PrismaService) {}

  async ownAPet(userId: string, { petId, ...ownerData }: CreateOwnerDto) {
    try {
      const existingPetInCharge = await this.prisma.userInCharge.findFirst({
        where: {
          email: ownerData.email,
          petId: petId,
        },
      });

      if (existingPetInCharge)
        throw new ConflictException('Owner already exists');

      if (await this.prisma.userInCharge.findFirst({ where: { petId } }))
        throw new ConflictException('Pets only have one owner');

      await this.prisma.pets.update({
        where: { id: petId },
        data: {
          available: [AvailablePets.ADOPTED],
        },
      });

      const petInCharge = await this.prisma.userInCharge.create({
        data: {
          ...ownerData,
          pet: {
            connect: {
              id: petId,
            },
          },
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });

      return petInCharge;
    } catch (error) {
      if (error instanceof ConflictException)
        throw new ConflictException(error.message);

      if (error.code === 'P2025') throw new NotFoundException('Pet not found');

      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  findAllOwners() {
    return this.prisma.userInCharge.findMany({
      select: {
        id: true,
        name: true,
        email: true,

        pet: {
          select: {
            id: true,
            name: true,
            available: true,
          },
        },
      },
    });
  }

  async findOneOwner(id: string): Promise<UserInCharge> {
    try {
      const owner = await this.prisma.userInCharge.findUnique({
        where: {
          id,
        },
      });
      if (!owner) throw new NotFoundException('Owner not found');

      return owner;
    } catch (error) {
      if (error instanceof NotFoundException)
        throw new NotFoundException(error.message);

      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async update(
    id: string,
    updateOwnerDto: UpdateOwnerDto,
  ): Promise<UserInCharge> {
    await this.findOneOwner(id);

    const updatedOwner = await this.prisma.userInCharge.update({
      where: { id },
      data: updateOwnerDto,
    });

    return updatedOwner;
  }

  async remove(id: string) {
    return await this.prisma.userInCharge.delete({
      where: { id },
    });
  }
}
