import { Module } from '@nestjs/common';

import { GoogleStrategy } from './auth/strategies/google.strategy';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { PetsModule } from './pets/pets.module';
import { OwnerModule } from './owner/owner.module';
import { StripeModule } from './stripe/stripe.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    UserModule,
    PetsModule,
    OwnerModule,
    StripeModule.forRootAsync(),
  ],
  controllers: [],
  providers: [GoogleStrategy],
})
export class AppModule {}
