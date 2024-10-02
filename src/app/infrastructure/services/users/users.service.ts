import { Injectable } from '@nestjs/common';
import { CON_FIG } from 'src/conf/config';
import { IUser } from '../../../controllers/res-api/users/user.service.i';
import { HttpClientService } from '../../common/http-client/http-client';
import { getUserCls } from '../../../common/cls/get-user-cls';

@Injectable()
export class UsersService {
  private userHost: null | string;

  constructor(private readonly httpClientService: HttpClientService) {
    this.userHost = CON_FIG.request.userService;
  }
  getRole() {
    const user = getUserCls();

    return user.roleId;
  }

  findById(id: number) {
    return this.httpClientService.get$<IUser>(
      `${this.userHost}/users/find-by-id/${id}`,
    );
  }
}
