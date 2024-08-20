import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KafkaService } from './kafka';
import { KafkaClient } from './kafka.i';

@Global()
@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: KafkaClient,
        useFactory: async () => {
          const kafkaHost = process.env.KAFKA_HOST;
          const kafkaPort = process.env.KAFKA_PORT;

          return {
            transport: Transport.KAFKA,
            options: {
              client: {
                clientId: 'auth',
                brokers: [`${kafkaHost}:${kafkaPort}`],
              },
              consumer: {
                groupId: 'auth-consumer',
              },
            },
          };
        },
      },
    ]),
  ],
  providers: [KafkaService],
  exports: [KafkaService],
})
export class KafkaModule {}
