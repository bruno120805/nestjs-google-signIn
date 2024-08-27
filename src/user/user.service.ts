import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(userData: CreateUserDto): Promise<User> {
    const { email, password } = userData;
    try {
      const user = await this.prisma.user.create({
        data: {
          ...userData,
          email: email.toLowerCase(),
          password: bcrypt.hashSync(password, 10),
        },
      });

      return user;
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  findAll(): Promise<User[]> {
    return this.prisma.user.findMany({});
  }

  async findOne(id: string): Promise<User> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
      });

      if (!user) throw new NotFoundException('User not found');

      return user;
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.findOne(id);

    try {
      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: updateUserDto,
      });

      return updatedUser;
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async remove(id: string): Promise<User> {
    await this.findOne(id);

    const deletedUser = await this.prisma.user.delete({
      where: { id },
    });

    return deletedUser;
  }

  private handleDBErrors(error: any): never {
    if (error.code === 'P2002') {
      throw new Error('User with that email already exists');
    }

    if (error.message === 'User not found') {
      throw new NotFoundException('User not found');
    }

    throw new Error('Something went wrong');
  }
}
