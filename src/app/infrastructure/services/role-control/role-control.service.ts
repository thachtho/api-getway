import { Injectable } from '@nestjs/common';
import { ConfigService } from '../../../../conf/config.service';
import { HttpClientService } from '../../common/http-client/http-client';

@Injectable()
export class RoleControlService {
  private roleHost: null | string;

  constructor(
    private readonly httpClientService: HttpClientService,
    private readonly configService: ConfigService,
  ) {
    this.roleHost = this.configService.roleHost;
  }

  getRoleControlOfUser(roleId: number) {
    return this.httpClientService.get$<any>(
      `${this.roleHost}/role-control?roleId=${roleId}`,
    );
  }
}
