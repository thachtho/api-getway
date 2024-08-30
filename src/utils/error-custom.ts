import { HttpStatus } from '@nestjs/common';
import { of } from 'rxjs';

export class ErrorCustom {
  static handle(error: any) {
    if (error?.message) {
      if (error?.message) {
        return {
          message: error?.message,
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        };
      }
    }

    if (error?.status) {
      return {
        statusCode: error.status,
        message: error.response,
      };
    }

    return error.response.data;
  }

  static handleError(error: any) {
    this.handle(error);

    return of(null);
  }
}
