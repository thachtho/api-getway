import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { ServicesModule } from 'src/app/infrastructure/services/services.module';

@Module({
  imports: [ServicesModule],
  controllers: [AuthController],
  providers: [],
})
export class AuthModule {}
