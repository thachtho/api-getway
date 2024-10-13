import { Module } from '@nestjs/common';
import { CoursesControler } from './courses.controller';
import { ServicesModule } from '../../../infrastructure/services/services.module';

@Module({
  imports: [ServicesModule],
  controllers: [CoursesControler],
})
export class CoursesControllerModule {}
