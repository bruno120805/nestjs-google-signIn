import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleOAuthGuard } from './guards/google-oauth.guard';
import { Response } from 'express';
import { LoginUser } from './dtos/login-user.dto';
import { RegisterUserDto } from './dtos/register-user.dot';
import { GetUser } from './decorators/get-user.decorator';
import { User } from '@prisma/client';
import { Auth } from './decorators/auth.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(GoogleOAuthGuard)
  async auth() {}

  @Get('google/callback')
  @UseGuards(GoogleOAuthGuard)
  async googleAuthCallback(@Req() req, @Res() res: Response) {
    const token = await this.authService.signInWithGoogle(req.user);

    res.cookie('access_token', token, {
      maxAge: 2592000000,
      sameSite: true,
      secure: false,
    });

    return res.status(HttpStatus.OK);
  }

  @Post('sign-up')
  singUp(@Body() userData: RegisterUserDto) {
    return this.authService.registerUserWithoutGoogle(userData);
  }

  @Post('login')
  @ApiOperation({ summary: 'login user' })
  @ApiResponse({
    status: 201,
  })
  @ApiBody({
    type: LoginUser,
    description: 'JSON object representing the user to be created',
  })
  loginWithoutGoogle(@Body() loginData: LoginUser) {
    return this.authService.loginWithoutGoogle(loginData);
  }

  @Get('test')
  @Auth('user')
  @UseGuards(JwtAuthGuard)
  test(@GetUser() user: User) {
    console.log(user);
  }

  // @Post('validate-token')
  // revalidateToken()
}
