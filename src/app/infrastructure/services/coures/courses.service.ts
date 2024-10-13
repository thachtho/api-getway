import { Injectable } from '@nestjs/common';
import { map } from 'rxjs';
import { ConfigService } from '../../../../conf/config.service';
import { getUserCls } from '../../../common/cls/get-user-cls';
import { ICourse } from '../../../common/interface/course.i';
import {
  CreateCourseDto,
  UpdateCourseDto,
} from '../../../controllers/res-api/courses/courses.controller.i';
import { HttpClientService } from '../../common/http-client/http-client';
import { KafkaProducerService } from '../../common/kafka-producer/kafka-producer';
import { Topics } from '../../common/kafka-producer/kafka-producer.i';

@Injectable()
export class CoursesService {
  private ucademicHost: null | string;

  constructor(
    private readonly configService: ConfigService,
    private readonly producer: KafkaProducerService,
    private readonly httpClientService: HttpClientService,
  ) {
    this.ucademicHost = this.configService.ucademicHost;
  }

  findAll() {
    const user = getUserCls();
    return this.httpClientService
      .get$<
        ICourse[]
      >(`${this.ucademicHost}/courses?organizationId=${user.agencyId}`)
      .pipe(
        map((res) => {
          return res.data;
        }),
      );
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
