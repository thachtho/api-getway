import { Controller, Get } from '@nestjs/common';
import { Route } from '../rest-api.i';
import { RoleControlUserUseCase } from '../../../application/role-control/role-control-user/role-control-user.usecase';

@Controller(Route.ROLE_CONTROL)
export class RoleControlControler {
  constructor(private readonly useCase: RoleControlUserUseCase) {}

  @Get()
  getRoleControl() {
    return this.useCase.excute();
  }
}
