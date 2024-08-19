import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { map } from 'rxjs';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Res()
    res: Response,
    @Body() body: LoginDTO,
  ) {
    return this.authService.login(body).pipe(
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
