import { Body, Controller, Post, Put } from '@nestjs/common';
import { CoursesService } from '../../../infrastructure/services/coures/courses.service';
import { Route } from '../rest-api.i';
import { CreateCourseDto, UpdateCourseDto } from './courses.controller.i';

@Controller(Route.COURSES)
export class CoursesControler {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  create(@Body() body: CreateCourseDto) {
    return this.coursesService.create(body);
  }

  @Put()
  update(@Body() body: UpdateCourseDto) {
    return this.coursesService.update(body);
  }
}
