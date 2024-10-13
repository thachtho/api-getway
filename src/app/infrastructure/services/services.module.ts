import { Module } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { RoleControlService } from './role-control/role-control.service';
import { UsersService } from './users/users.service';
import { CoursesService } from './coures/courses.service';

const services = [
  AuthService,
  UsersService,
  RoleControlService,
  CoursesService,
];
@Module({
  imports: [],
  providers: [...services],
  exports: [...services],
})
export class ServicesModule {}
