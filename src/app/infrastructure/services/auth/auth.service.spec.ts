import { Test, TestingModule } from '@nestjs/testing';
import { of, throwError } from 'rxjs';
import {
  IResponseLogin,
  LoginDTO,
} from '../../../controllers/res-api/auth/auth.controller.i';
import { AuthService } from './auth.service';
import { KafkaProducerService } from '../../common/kafka-producer/kafka-producer';
import { Topics } from '../../common/kafka-producer/kafka-producer.i';

describe('AuthService', () => {
  let authService: AuthService;
  let kafkaService: KafkaProducerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: KafkaProducerService,
          useValue: {
            send$: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    kafkaService = module.get<KafkaProducerService>(KafkaProducerService);
  });

  it('should successfully log in', (done) => {
    const loginDto: LoginDTO = { nickname: 'test', password: 'test' };
    const response: IResponseLogin = {
      access_token: 'access_token',
      refresh_token: 'refresh_token',
    };

    jest.spyOn(kafkaService, 'send$').mockReturnValue(of(response));

    authService.login(loginDto).subscribe(() => {
      expect(kafkaService.send$).toHaveBeenCalledWith({
        topic: Topics.AUTH_LOGIN,
        data: loginDto,
      });
      done();
    });
  });

  it('should throw an error on login failure', (done) => {
    const loginDto: LoginDTO = { nickname: 'test', password: 'test' };
    const errorResponse = new Error('Login failed');

    jest
      .spyOn(kafkaService, 'send$')
      .mockReturnValue(throwError(() => errorResponse));

    authService.login(loginDto).subscribe({
      next: () => {},
      error: (error) => {
        expect(error).toEqual(errorResponse);
        done();
      },
    });
  });
});
