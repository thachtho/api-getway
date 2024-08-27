import { Injectable } from '@nestjs/common';
import { Observable, catchError } from 'rxjs';
import { KafkaService } from '../kafka/kafka';
import { Topics } from '../kafka/kafka.i';
import { IResponseLogin } from './auth.controller.i';
import { LoginDTO } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly authClient: KafkaService) {}

  login(body: LoginDTO): Observable<IResponseLogin> {
    return this.authClient
      .send$({
        topic: Topics.AUTH_LOGIN,
        data: body,
      })
      .pipe(
        catchError((error) => {
          throw error;
        }),
      );
  }
}
