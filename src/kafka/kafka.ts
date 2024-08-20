import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { catchError, map, mergeMap, of } from 'rxjs';
import { KafkaClient, KafkaEvent, KafkaHealth, KafkaMessage } from './kafka.i';

@Injectable()
export class KafkaService {
  healthStatus = KafkaHealth.WAITING;

  constructor(@Inject(KafkaClient) private readonly client: ClientKafka) {}

  onModuleInit() {
    this.client.subscribeToResponseOf(KafkaMessage);
    setInterval(() => {
      this.checkHealth().subscribe();
    }, 5000);
  }

  send$(data: any) {
    return this.client.send(KafkaMessage, JSON.stringify(data));
  }

  checkHealth() {
    return this.client
      .send(
        KafkaMessage,
        JSON.stringify({
          eventName: KafkaEvent.HEALTH_CHECK,
        }),
      )
      .pipe(
        mergeMap((res) => {
          return of(res);
        }),
        map((results) => {
          console.log(results);
          return results;
        }),
        catchError((error) => {
          throw error;
        }),
      );
  }
}
