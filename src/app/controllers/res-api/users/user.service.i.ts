import { IsEnum } from 'class-validator';

export enum UserTypeCreate {
  ADMIN_AGENCY = 'adminAgency',
  TEACHER = 'teacher',
  STUDENT = 'student',
}
export class TypeCreateDto {
  @IsEnum(UserTypeCreate, {
    message:
      'typeCreate must be one of the following values: adminAgency, teacher, student',
  })
  typeCreate: UserTypeCreate;
}
