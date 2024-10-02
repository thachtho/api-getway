import { Module } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';
import { RoleControlService } from './role-control/role-control.service';

const services = [AuthService, UsersService, RoleControlService];
@Module({
  imports: [],
  providers: [...services],
  exports: [...services],
})
export class ServicesModule {}
