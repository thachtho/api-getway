import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDTO {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty({ default: 'admin@gmail.com' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ default: '111111' })
  password: string;
}
