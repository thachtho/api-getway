import { Controller, Get } from '@nestjs/common';
import { UsersService } from '../../../infrastructure/services/users/users.service';
import { Route } from '../rest-api.i';

@Controller(Route.USERS)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('get-role')
  getRole() {
    return this.usersService.getRole();
  }
}
