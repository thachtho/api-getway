import { Injectable } from '@nestjs/common';
import { IUser } from './user.service.i';
import { CON_FIG } from 'src/conf/config';
import { HttpClientService } from '../../../infrastructure/common/http-client/http-client';

@Injectable()
export class UsersService {
  private userHost: null | string;

  constructor(private readonly httpClientService: HttpClientService) {
    this.userHost = CON_FIG.request.userService;
  }
  getRole() {}

  findById(id: number) {
    return this.httpClientService.get$<IUser>(
      `${this.userHost}/users/find-by-id/${id}`,
    );
  }
}
