import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KafkaProducerService } from './kafka-producer';
import { KafkaClient } from './kafka-producer.i';

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
                brokers: [`${kafkaHost}:${kafkaPort}`],
              },
            },
          };
        },
      },
    ]),
  ],
  providers: [KafkaProducerService],
  exports: [KafkaProducerService],
})
export class KafkaProducerModule {}
