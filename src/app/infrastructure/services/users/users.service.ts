import { Injectable } from '@nestjs/common';
import { map } from 'rxjs';
import { ConfigService } from '../../../../conf/config.service';
import { getUserCls } from '../../../common/cls/get-user-cls';
import { IUser } from '../../../common/interface/user.i';
import { HttpClientService } from '../../common/http-client/http-client';
import { KafkaProducerService } from '../../common/kafka-producer/kafka-producer';
import { Topics } from '../../common/kafka-producer/kafka-producer.i';
import { TypeUser, UserArg } from './user.service.i';

@Injectable()
export class UsersService {
  private userHost: null | string;

  constructor(
    private readonly httpClientService: HttpClientService,
    private readonly configService: ConfigService,
    private readonly producer: KafkaProducerService,
  ) {
    this.userHost = this.configService.userHost;
  }
  getRole() {
    const user = getUserCls();

    return user.roleId;
  }

  create(payload: UserArg, type: TypeUser) {
    return this.producer.send$({
      topic: Topics.CREATE_USER,
      data: { type, data: { ...payload } },
    });
  }

  update(payload: UserArg) {
    return this.producer.send$({
      topic: Topics.UPDATE_USER,
      data: { data: { ...payload } },
    });
  }

  findAll(typeGet: number) {
    const user = getUserCls();
    return this.httpClientService
      .get$<
        IUser[]
      >(`${this.userHost}/users?typeGet=${typeGet}&organizationId=${user.agencyId}`)
      .pipe(
        map((res) => {
          return res.data;
        }),
      );
  }

  findById(id: number) {
    return this.httpClientService.get$<IUser>(
      `${this.userHost}/users/find-by-id/${id}`,
    );
  }
}
