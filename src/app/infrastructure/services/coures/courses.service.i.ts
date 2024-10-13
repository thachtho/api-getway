import { IUser } from '../../../common/interface/user.i';

export type TypeUser = 'adminAgency' | 'teacher' | 'student';
export type TypeGetUser = 1 | 2 | 3 | 4;

export interface UserArg extends IUser {}
