import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { IUser } from '../../../common/interface/user.i';
import { UsersService } from '../../../infrastructure/services/users/users.service';
import { Route } from '../rest-api.i';
import { TypeCreateDto, TypeGetUserDto } from './user.service.i';

@Controller(Route.USERS)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('get-role')
  getRole() {
    return this.usersService.getRole();
  }

  @Get('')
  findAll(@Query() query: TypeGetUserDto) {
    const { typeGet } = query;
    return this.usersService.findAll(Number(typeGet));
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
