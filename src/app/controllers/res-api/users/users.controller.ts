import { Controller, Get } from '@nestjs/common';
import { UsersService } from '../../../infrastructure/services/users/users.service';
import { Auth } from 'src/app/infrastructure/common/guard/auth.guard.i';
import { ROLE } from 'src/app/controllers/res-api/role-control/role.i';
import { Route } from '../rest-api.i';

@Controller(Route.USERS)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('get-role')
  @Auth([ROLE.ADMIN])
  getRole() {
    return this.usersService.getRole();
  }
}
