import { Module } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { OwnerController } from './owner.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [OwnerController],
  providers: [OwnerService],
  imports: [AuthModule],
})
export class OwnerModule {}
