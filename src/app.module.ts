import { Module } from '@nestjs/common';

import { GoogleStrategy } from './auth/strategies/google.strategy';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AuthModule, PrismaModule, UserModule],
  controllers: [],
  providers: [GoogleStrategy],
})
export class AppModule {}
