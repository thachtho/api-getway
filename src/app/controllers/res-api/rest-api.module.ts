import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { RoleControlControllerModule } from './role-control/role-control.controller.module';
import { UsersModule } from './users/users.module';

const controllerModules = [
  AuthModule,
  UsersModule,
  RoleControlControllerModule,
];
@Module({
  imports: [...controllerModules],
})
export class RestApiModule {}
