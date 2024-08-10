import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { UsersService } from '../src/users/users.service';
import { of, throwError } from 'rxjs';

describe('UsersController (e2e)', () => {
  let app: INestApplication;
  let usersService: UsersService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    usersService = moduleFixture.get<UsersService>(UsersService);
  });

  afterAll(async () => {
    await app.close();
  });

  it('/users/:id (GET) should return user data', async () => {
    const userId = 1;
    const mockUser = { id: userId, name: 'John Doe' };

    // Gửi yêu cầu GET và kiểm tra phản hồi
    await request(app.getHttpServer())
      .get(`/users/${userId}`)
      .expect(200)
      .expect((response) => {
        console.log(2222222, response.body);
        expect(response.body).toEqual(mockUser);
      });
  });
});
