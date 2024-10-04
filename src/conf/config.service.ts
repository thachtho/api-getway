import { Injectable } from '@nestjs/common';
import { ConfigService as Config } from '@nestjs/config';
import { ENV } from './config.i';

@Injectable()
export class ConfigService {
  userHost: string | null = '';
  roleHost: string | null = '';

  constructor(private readonly config: Config) {
    this.userHost = this.getUrl(ENV.USER_SERVICE_HOST);
    this.roleHost = this.getUrl(ENV.ROLE_SERVICE_HOST);
  }

  getUrl(key: string) {
    return `http://${this.config.get(key)}`;
  }
}
