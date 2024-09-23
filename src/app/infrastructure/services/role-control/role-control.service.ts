import { Injectable } from '@nestjs/common';
import { IUser } from '../../../controllers/res-api/users/user.service.i';
import { CON_FIG } from 'src/conf/config';
import { HttpClientService } from '../../common/http-client/http-client';

@Injectable()
export class RoleControlService {
  private roleControlHost: null | string;

  constructor(private readonly httpClientService: HttpClientService) {
    this.roleControlHost = CON_FIG.request.roleControlService;
  }

  getRoleControlOfUser(roleId: number) {
    return this.httpClientService.get$<IUser>(
      `${this.roleControlHost}/role-control?roleId=${roleId}`,
    );
  }
}
