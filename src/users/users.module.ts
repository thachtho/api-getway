import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'USER_MICROSERVICE',
        useFactory: async () => {
          const kafkaHost = process.env.KAFKA_HOST;
          const kafkaPort = process.env.KAFKA_PORT;

          return {
            transport: Transport.KAFKA,
            options: {
              client: {
                clientId: 'user',
                brokers: [`${kafkaHost}:${kafkaPort}`],
              },
              consumer: {
                groupId: 'user-consumer',
              },
            },
          };
        },
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
