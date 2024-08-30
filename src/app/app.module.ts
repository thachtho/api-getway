import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './controllers/res-api/users/users.module';
import { AuthModule } from './controllers/res-api/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './infrastructure/common/guard/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { ClsModule } from 'nestjs-cls';
import { HttpClientModule } from './infrastructure/common/http-client/http-client.module';
import { KafkaProducerModule } from './infrastructure/common/kafka-producer/kafka-producer.module';

@Module({
  imports: [
    ClsModule.forRoot({
      middleware: {
        mount: true,
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule,
    UsersModule,
    AuthModule,
    KafkaProducerModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
