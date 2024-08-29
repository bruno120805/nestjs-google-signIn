import { Module } from '@nestjs/common';

import { GoogleStrategy } from './auth/strategies/google.strategy';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { PetsModule } from './pets/pets.module';
import { OwnerModule } from './owner/owner.module';

@Module({
  imports: [AuthModule, PrismaModule, UserModule, PetsModule, OwnerModule],
  controllers: [],
  providers: [GoogleStrategy],
})
export class AppModule {}
