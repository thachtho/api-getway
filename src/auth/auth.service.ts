import { Injectable } from '@nestjs/common';
import { Observable, catchError } from 'rxjs';
import { KafkaEvent } from 'src/kafka/kafka.i';
import { IResponseLogin } from './auth.controller.i';
import { LoginDTO } from './dto/login.dto';
import { KafkaService } from 'src/kafka/kafka';

@Injectable()
export class AuthService {
  constructor(private readonly authClient: KafkaService) {}

  login(body: LoginDTO): Observable<IResponseLogin> {
    return this.authClient
      .send$({
        eventName: KafkaEvent.AUTH_LOGIN,
        data: body,
      })
      .pipe(
        catchError((error) => {
          throw error; // hoặc return throwError(error); nếu bạn muốn truyền tiếp lỗi
        }),
      );
  }
}
