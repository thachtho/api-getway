import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { KafkaService } from '../kafka/kafka';
import { Topics } from '../kafka/kafka.i';
import { of, throwError } from 'rxjs';
import { LoginDTO } from './dto/login.dto';
import { IResponseLogin } from './auth.controller.i';

describe('AuthService', () => {
  let authService: AuthService;
  let kafkaService: KafkaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: KafkaService,
          useValue: {
            send$: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    kafkaService = module.get<KafkaService>(KafkaService);
  });

  it('should successfully log in', (done) => {
    const loginDto: LoginDTO = { email: 'test', password: 'test' };
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
    const loginDto: LoginDTO = { email: 'test', password: 'test' };
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
