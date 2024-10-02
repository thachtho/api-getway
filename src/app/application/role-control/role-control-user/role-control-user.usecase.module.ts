import { Module } from '@nestjs/common';
import { ServicesModule } from 'src/app/infrastructure/services/services.module';
import { RoleControlUserUseCase } from './role-control-user.usecase';

@Module({
  imports: [ServicesModule],
  providers: [RoleControlUserUseCase],
  exports: [RoleControlUserUseCase],
})
export class RoleControlUserUseCaseModule {}
