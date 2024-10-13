import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateCourseDto {
  @IsNumber()
  @IsNotEmpty()
  start: number;

  @IsNumber()
  @IsNotEmpty()
  end: number;
}

export class UpdateCourseDto {
  @IsNumber()
  id: number;

  @IsOptional()
  @IsNumber()
  start?: number;

  @IsOptional()
  @IsNumber()
  end?: number;
}
