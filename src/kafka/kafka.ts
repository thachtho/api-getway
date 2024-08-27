import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { catchError, map, mergeMap, of } from 'rxjs';
import { KafkaClient, Topics } from './kafka.i';

@Injectable()
export class KafkaService {
  constructor(@Inject(KafkaClient) private readonly client: ClientKafka) {}

  onModuleInit() {
    const topicValues = Object.values(Topics);
    for (const topicValue of topicValues) {
      this.client.subscribeToResponseOf(topicValue);
    }

    setInterval(() => {
      this.checkHealth().subscribe();
    }, 5000);
  }

  send$({ topic, data = '' }: { topic: Topics; data?: any }) {
    return this.client.send(topic, JSON.stringify(data));
  }

  checkHealth() {
    return this.send$({
      topic: Topics.HEALTH_CHECK,
    }).pipe(
      mergeMap((res) => {
        return of(res);
      }),
      map((results) => {
        return results;
      }),
      catchError((error) => {
        throw error;
      }),
    );
  }
}
