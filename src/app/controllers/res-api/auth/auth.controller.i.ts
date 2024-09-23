import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ default: 'admin' })
  nickname: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ default: '111111' })
  password: string;
}

export interface IResponseLogin {
  access_token: string;
  refresh_token: string;
}
