import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { ClsServiceManager } from 'nestjs-cls';
import { Observable } from 'rxjs';
import { Cls } from '../../../../utils/cls.i';

@Injectable()
export class HttpClientService {
  constructor(private readonly httpService: HttpService) {
    this.httpService.axiosRef.interceptors.request.use((request) => {
      const user = ClsServiceManager.getClsService().get(Cls.USER);

      if (user) {
        request.headers[Cls.USER] = user;
      }

      return request;
    });
  }

  get$<T>(url: string): Observable<AxiosResponse<T, any>> {
    return this.httpService.get(url);
  }
}
