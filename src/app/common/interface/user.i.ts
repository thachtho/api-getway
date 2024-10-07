export interface IUser {
  id: number;
  nickname: string;
  fullname?: string;
  password?: string;
  email?: string;
  roleId?: number;
  agencyId: number;
}
