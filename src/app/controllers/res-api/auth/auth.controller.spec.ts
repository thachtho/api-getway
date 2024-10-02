import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from '../../../infrastructure/services/auth/auth.service';
import { Response } from 'express';
import { of } from 'rxjs';
import { LoginDTO } from './auth.controller.i';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;
  let mockResponse: Response;

  const mockAuthService = {
    login: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: Response,
          useValue: {
            setHeader: jest.fn(),
            send: jest.fn(),
          },
        },
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    mockResponse = module.get<Response>(Response);
  });

  it('should call authService.login and set response headers and send refresh token', async () => {
    const mockLoginData = {
      access_token: 'test_access_token',
      refresh_token: 'test_refresh_token',
    };
    jest.spyOn(authService, 'login').mockReturnValue(of(mockLoginData));

    const loginDto: LoginDTO = {
      nickname: 'email',
      password: 'pass',
    };

    await controller.login(mockResponse, loginDto);

    expect(authService.login).toHaveBeenCalledWith(loginDto);
    expect(mockResponse.setHeader).toHaveBeenCalled();
    expect(mockResponse.setHeader).toHaveBeenCalledWith('Set-Cookie', [
      'token=test_access_token; HttpOnly; Path=/',
    ]);
    expect(mockResponse.send).toHaveBeenCalledWith({
      refresh_token: 'test_refresh_token',
    });
  });
});
