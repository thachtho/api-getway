import { Injectable } from '@nestjs/common';
import { map } from 'rxjs';
import { getUserCls } from '../../../common/cls/get-user-cls';
import { RoleControlService } from '../../../infrastructure/services/role-control/role-control.service';

@Injectable()
export class RoleControlUserUseCase {
  constructor(private readonly roleService: RoleControlService) {}

  excute() {
    const user = getUserCls();
    return this.roleService.getRoleControlOfUser(user.id as number).pipe(
      map((res) => {
        return res.data;
      }),
    );
  }
}
