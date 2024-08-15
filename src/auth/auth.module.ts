import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
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
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
