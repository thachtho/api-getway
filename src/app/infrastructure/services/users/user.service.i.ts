import { IUser } from '../../../common/interface/user.i';

export type TypeCreateUser = 'adminAgency' | 'teacher' | 'student';

export interface UserArg extends IUser {}
