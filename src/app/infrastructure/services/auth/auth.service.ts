import { Injectable } from '@nestjs/common';
import { Observable, catchError } from 'rxjs';
import { KafkaProducerService } from '../../common/kafka-producer/kafka-producer';
import { Topics } from '../../common/kafka-producer/kafka-producer.i';
import {
  IResponseLogin,
  LoginDTO,
} from '../../../controllers/res-api/auth/auth.controller.i';

@Injectable()
export class AuthService {
  constructor(private readonly authClient: KafkaProducerService) {}

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
