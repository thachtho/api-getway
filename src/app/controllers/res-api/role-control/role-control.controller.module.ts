import { Module } from '@nestjs/common';
import { RoleControlControler } from './role-control.controller';
import { RoleControlUserUseCaseModule } from 'src/app/application/role-control/role-control-user/role-control-user.usecase.module';

@Module({
  imports: [RoleControlUserUseCaseModule],
  controllers: [RoleControlControler],
})
export class RoleControlControllerModule {}
