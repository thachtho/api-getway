import { Injectable } from '@nestjs/common';
import { ConfigService } from '../../../../conf/config.service';
import { CreateCourseDto, UpdateCourseDto } from '../../../controllers/res-api/courses/courses.controller.i';
import { KafkaProducerService } from '../../common/kafka-producer/kafka-producer';
import { Topics } from '../../common/kafka-producer/kafka-producer.i';
import { getUserCls } from '../../../common/cls/get-user-cls';

@Injectable()
export class CoursesService {
  private userHost: null | string;

  constructor(
    private readonly configService: ConfigService,
    private readonly producer: KafkaProducerService,
  ) {
    this.userHost = this.configService.userHost;
  }

  create(payload: CreateCourseDto) {
    const user = getUserCls();
    const arg = {
      start: payload.start,
      end: payload.end,
      organizationId: user.agencyId,
    };
    return this.producer.send$({
      topic: Topics.CREATE_COURSE,
      data: { data: { ...arg } },
    });
  }

  update(payload: UpdateCourseDto) {
    const user = getUserCls();
    const arg = {
      id: payload.id,
      start: payload.start,
      end: payload.end,
      organizationId: user.agencyId,
    };
    return this.producer.send$({
      topic: Topics.UPDATE_COURSE,
      data: { data: { ...arg } },
    });
  }
}
