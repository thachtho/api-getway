import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @Inject('USER_MICROSERVICE') private readonly userClient: ClientKafka,
  ) {}

  onModuleInit() {
    this.userClient.subscribeToResponseOf('get-user');
  }

  findOne(id: number): Observable<any> {
    return this.userClient.send(
      'get-user',
      JSON.stringify({
        userId: id,
      }),
    );
  }
}
