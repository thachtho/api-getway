import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { Auth } from 'src/app/infrastructure/common/guard/auth.guard.i';
import { ROLE } from 'src/app/controllers/res-api/role/role.i';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('get-role')
  @Auth([ROLE.ADMIN])
  getRole() {
    return this.usersService.getRole()
  }
}
