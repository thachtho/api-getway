export interface IUser {
  id: number;
  nickname: string;
  fullname?: string;
  password?: string;
  email?: string;
  roleId?: number;
  agencyId?: number;
}

export enum Role {
  ADMIN = 1,
  ADMIN_AGENCY = 2,
  TEACHER = 3,
  STUDENT = 4,
}
