import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtPayload } from './interfaces/jwt-payload';
import { RegisterUserDto } from './dtos/register-user.dot';
import { generateFromEmail } from 'unique-username-generator';
import { User } from '@prisma/client';
import { LoginUser } from './dtos/login-user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
  ) {}

  generateJwtToken(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }

  // async singUp(userData: RegisterUserDto): Promise<User> {}

  // async login() {}

  async signInWithGoogle(user: User): Promise<string> {
    if (!user) throw new NotFoundException('User not found');

    const userExists = await this.findUserByEmail(user.email);

    if (!userExists) {
      return this.registerUser(user);
    }

    return this.generateJwtToken({
      id: userExists.id,
      email: userExists.email,
    });
  }

  async loginWithoutGoogle(loginData: LoginUser) {
    const user = await this.findUserByEmail(loginData.email);

    if (!user) throw new NotFoundException('User not found');

    if (!bcrypt.compareSync(loginData.password, user.password))
      throw new BadRequestException('Invalid credentials');

    const accessToken = this.generateJwtToken({
      id: user.id,
      email: user.email,
    });

    return {
      ...user,
      accessToken,
    };
  }

  async registerUserWithoutGoogle(userData: RegisterUserDto) {
    try {
      const user = await this.userService.createUser(userData);

      const accesToken = this.generateJwtToken({
        id: user.id,
        email: user.email,
      });

      return {
        ...user,
        accesToken,
      };
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (!user) throw new NotFoundException('Email not found');

    return user;
  }

  private async registerUser(userData: RegisterUserDto): Promise<string> {
    try {
      const newUser = await this.prismaService.user.create({
        data: {
          ...userData,
          name: generateFromEmail(userData.email),
        },
      });

      return this.generateJwtToken({
        id: newUser.id,
        email: newUser.email,
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  private async handleDBErrors(error: any) {
    if (error.code === 'P2002') {
      throw new BadRequestException('Email already exists');
    }
    throw new InternalServerErrorException();
  }
}
