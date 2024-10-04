import { Test, TestingModule } from '@nestjs/testing';
import { lastValueFrom, of, throwError } from 'rxjs';
import { RoleControlUserUseCase } from '../../../application/role-control/role-control-user/role-control-user.usecase';
import { RoleControlControler } from './role-control.controller';

describe('AuthController', () => {
  let controller: RoleControlControler;
  let usecase: RoleControlUserUseCase;

  class MockRoleControlUserUseCase {
    excute = jest.fn();
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoleControlControler],
      providers: [
        {
          provide: RoleControlUserUseCase,
          useClass: MockRoleControlUserUseCase,
        },
      ],
    }).compile();

    controller = module.get<RoleControlControler>(RoleControlControler);
    usecase = module.get<RoleControlUserUseCase>(RoleControlUserUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe(RoleControlControler.name, () => {
    it('should call roleControlUserUseCase.excute success', async () => {
      const expected = {
        id: 1,
        name: 'Admin',
      };
      jest.spyOn(usecase, 'excute').mockReturnValue(of(expected));
      lastValueFrom(controller.getRoleControl()).then((res) => {
        expect(res).toEqual(expected);
      });
    });

    it('should call roleControlUserUseCase.excute error', () => {
      const errorResponse = new Error('Login failed');
      jest
        .spyOn(usecase, 'excute')
        .mockReturnValue(throwError(() => errorResponse));

      lastValueFrom(controller.getRoleControl()).catch((err) => {
        expect(err).toEqual(errorResponse);
      });
    });
  });
});
