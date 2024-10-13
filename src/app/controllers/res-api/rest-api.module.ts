import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { RoleControlControllerModule } from './role-control/role-control.controller.module';
import { UsersModule } from './users/users.module';
import { CoursesControllerModule } from './courses/courses.controller.module';

const controllerModules = [
  AuthModule,
  UsersModule,
  RoleControlControllerModule,
  CoursesControllerModule,
];
@Module({
  imports: [...controllerModules],
})
export class RestApiModule {}
