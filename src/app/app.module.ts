import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { ClsModule } from 'nestjs-cls';
import { RestApiModule } from './controllers/res-api/rest-api.module';
import { AuthGuard } from './infrastructure/common/guard/auth.guard';
import { HttpClientModule } from './infrastructure/common/http-client/http-client.module';
import { KafkaProducerModule } from './infrastructure/common/kafka-producer/kafka-producer.module';
import { ServicesModule } from './infrastructure/services/services.module';

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
    RestApiModule,
    ServicesModule,
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
