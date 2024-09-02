import {
  createParamDecorator,
  InternalServerErrorException,
} from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { User } from '@prisma/client';

export const GetUser = createParamDecorator(
  (data: string, ctx: ExecutionContextHost) => {
    const request = ctx.switchToHttp().getRequest();
    const user: User = request.user;

    if (!user)
      throw new InternalServerErrorException('User not found (request)');

    return !data ? user : user[data];
  },
);
