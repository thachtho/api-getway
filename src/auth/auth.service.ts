import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Observable, catchError } from 'rxjs';
import { IResponseLogin } from './auth.controller.i';
import { LoginDTO } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_MICROSERVICE') private readonly userClient: ClientKafka,
  ) {}

  onModuleInit() {
    this.userClient.subscribeToResponseOf('IMO-AUTH');
  }
  login(body: LoginDTO): Observable<IResponseLogin> {
    return this.userClient
      .send(
        'IMO-AUTH',
        JSON.stringify({
          eventName: 'auth-login',
          data: body,
        }),
      )
      .pipe(
        catchError((error) => {
          throw error; // hoặc return throwError(error); nếu bạn muốn truyền tiếp lỗi
        }),
      );
  }
}
