import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ClsService } from 'nestjs-cls';
import { lastValueFrom } from 'rxjs';
import { ROLE } from 'src/app/controllers/res-api/role-control/role.i';
import { IS_PUBLIC_KEY, IUserSesson, jwtConstants } from './auth.guard.i';
import { IUser } from 'src/app/controllers/res-api/users/user.service.i';
import { Cls } from 'src/utils/cls.i';
import { UsersService } from '../../services/users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private userService: UsersService,
    private readonly cls: ClsService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const roles = this.reflector.getAllAndOverride<number[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload: IUserSesson = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      const { data: user } =
        (await lastValueFrom(this.userService.findById(payload.userId))) || {};

      this.checkPermission(roles, user[0]);
      this.cls.set(Cls.USER, JSON.stringify(user[0]));
    } catch (err) {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const cookieString = request.headers.cookie;
    if (cookieString) {
      const cookieToken = this.getValueByKeyInCookie(cookieString, 'token');

      if (cookieToken) {
        return cookieToken;
      }
    }

    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private getValueByKeyInCookie(cookieString: string, key: string) {
    const valueCookie = cookieString
      .split(';')
      .map((cookie) => cookie.trim())
      .find((cookie) => cookie.startsWith(`${key}=`));

    let tokenValue: string | undefined;
    if (valueCookie) {
      const [, value] = valueCookie.split('=');
      tokenValue = value;
    }

    return tokenValue;
  }

  private checkPermission(roles: number[], user: IUser) {
    if (user.roleId === ROLE.ADMIN) {
      return;
    }

    if (roles) {
      const isCheck = roles.includes(user.roleId);

      if (!isCheck) {
        throw new UnauthorizedException();
      }
    }
  }
}
