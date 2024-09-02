import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { META_ROLES } from '../decorators/role-protected.decorator';
import { ValidRoles } from '../interfaces/valid-roles';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const validRoles: string[] = this.reflector.get(
      META_ROLES,
      context.getHandler(),
    );

    if (!validRoles) return true;
    if (validRoles.length === 0) return true;

    const { user } = context.switchToHttp().getRequest();

    if (!user) throw new BadRequestException('User not Found');

    for (const role of user.role) {
      if (validRoles.includes(role as ValidRoles)) {
        return true;
      }
    }
    throw new ForbiddenException(
      `User ${user.name} need a valid role: [${validRoles}] (Role)`,
    );
  }
}
