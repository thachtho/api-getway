import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { UsersService } from '../../../infrastructure/services/users/users.service';
import { Route } from '../rest-api.i';
import { TypeCreateDto } from './user.service.i';
import { IUser } from '../../../common/interface/user.i';

@Controller(Route.USERS)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('get-role')
  getRole() {
    return this.usersService.getRole();
  }

  @Post('')
  create(@Body() body: IUser, @Query() query: TypeCreateDto) {
    const { typeCreate } = query;
    return this.usersService.create(body, typeCreate);
  }

  @Put('')
  update(@Body() body: IUser) {
    return this.usersService.update(body);
  }
}
