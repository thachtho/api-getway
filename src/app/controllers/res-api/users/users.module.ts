import { Module } from '@nestjs/common';
import { ServicesModule } from 'src/app/infrastructure/services/services.module';
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
  imports: [ServicesModule],
})
export class UsersModule {}
