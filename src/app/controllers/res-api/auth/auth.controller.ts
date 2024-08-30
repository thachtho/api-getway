import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { Public } from '../../../infrastructure/common/guard/auth.guard.i';

@Controller('auth')
@Public()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Res() res: Response, @Body() loginDto: LoginDTO) {
    const result = await this.authService.login(loginDto).toPromise();

    res.setHeader('Set-Cookie', [
      `token=${result.access_token}; HttpOnly; Path=/`,
    ]);
    res.send({ refresh_token: result.refresh_token });
  }
}
