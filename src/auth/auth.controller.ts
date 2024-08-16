import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { map } from 'rxjs';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('login')
  async login(
    @Res()
    res: Response,
  ) {
    return this.authService.login().pipe(
      map((data) => {
        const { access_token, refresh_token } = data || {};
        res.setHeader('Set-Cookie', [
          `token=${access_token}; HttpOnly; Path=/`,
        ]);
        return res.send({ refresh_token });
      }),
    );
  }
}
