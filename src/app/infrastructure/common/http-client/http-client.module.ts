import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { HttpClientService } from './http-client';

@Global()
@Module({
  imports: [HttpModule.register({})],
  providers: [HttpClientService],
  exports: [HttpClientService],
})
export class HttpClientModule {}
