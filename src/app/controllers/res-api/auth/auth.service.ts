import { Injectable } from '@nestjs/common';
import { Observable, catchError } from 'rxjs';
import { IResponseLogin } from './auth.controller.i';
import { LoginDTO } from './dto/login.dto';
import { Topics } from '../../../infrastructure/common/kafka-producer/kafka-producer.i';
import { KafkaProducerService } from 'src/app/infrastructure/common/kafka-producer/kafka-producer';

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
