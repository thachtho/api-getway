import { Test, TestingModule } from '@nestjs/testing';
import { lastValueFrom, of, throwError } from 'rxjs';
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

  class MockKafkaProducerService {
    send$ = jest.fn();
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: KafkaProducerService,
          useClass: MockKafkaProducerService,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    kafkaService = module.get<KafkaProducerService>(KafkaProducerService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
    expect(kafkaService).toBeDefined();
  });

  it('should successfully log in', () => {
    const loginDto: LoginDTO = { nickname: 'test', password: 'test' };
    const response: IResponseLogin = {
      access_token: 'access_token',
      refresh_token: 'refresh_token',
    };

    jest.spyOn(kafkaService, 'send$').mockReturnValue(of(response));
    lastValueFrom(authService.login(loginDto)).then(() => {
      expect(kafkaService.send$).toHaveBeenCalledWith({
        topic: Topics.AUTH_LOGIN,
        data: loginDto,
      });
    });
  });

  it('shold throw error login fail', () => {
    const loginDto: LoginDTO = { nickname: 'test', password: 'test' };
    const error = new Error();

    jest.spyOn(kafkaService, 'send$').mockReturnValue(throwError(() => error));
    lastValueFrom(authService.login(loginDto)).catch((err) => {
      expect(err).toEqual(error);
    });
  });
});
