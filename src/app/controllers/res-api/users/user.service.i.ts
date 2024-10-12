import { IsEnum } from 'class-validator';

export enum UserType {
  ADMIN_AGENCY = 'adminAgency',
  TEACHER = 'teacher',
  STUDENT = 'student',
}
export class TypeCreateDto {
  @IsEnum(UserType, {
    message:
      'typeCreate must be one of the following values: adminAgency, teacher, student',
  })
  typeCreate: UserType;
}

export class TypeGetUserDto {
  typeGet: string;
}
