import { ClsServiceManager } from 'nestjs-cls';
import { IUser } from '../../../../../imo-bff/src/app/common/interface/user.i';

const getUserCls = (): IUser => {
  const user = ClsServiceManager.getClsService().get('user');

  return JSON.parse(user);
};

export { getUserCls };
