import { Injectable } from '@nestjs/common';
import { ConfigService } from '../../../../conf/config.service';
import { getUserCls } from '../../../common/cls/get-user-cls';
import { IUser } from '../../../controllers/res-api/users/user.service.i';
import { HttpClientService } from '../../common/http-client/http-client';

@Injectable()
export class UsersService {
  private userHost: null | string;

  constructor(
    private readonly httpClientService: HttpClientService,
    private readonly configService: ConfigService,
  ) {
    this.userHost = this.configService.userHost;
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
