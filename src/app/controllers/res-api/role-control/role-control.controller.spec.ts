import { lastValueFrom, of, throwError } from 'rxjs';
import { RoleControlUserUseCase } from '../../../application/role-control/role-control-user/role-control-user.usecase';
import { RoleControlControler } from './role-control.controller';
import { Test, TestingModule } from '@nestjs/testing';

describe(RoleControlControler.name, () => {
  let controller: RoleControlControler;
  let useCase: RoleControlUserUseCase;

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
    useCase = module.get<RoleControlUserUseCase>(RoleControlUserUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(useCase).toBeDefined();
  });

  describe(RoleControlControler.prototype.getRoleControl.name, () => {
    it('shold return value success', () => {
      const result = {};
      jest.spyOn(useCase, 'excute').mockReturnValue(of(result));
      lastValueFrom(controller.getRoleControl()).then((res) => {
        expect(res).toEqual(result);
      });
    });

    it('shold call error', () => {
      const error = new Error();
      jest.spyOn(useCase, 'excute').mockReturnValue(throwError(() => error));
      lastValueFrom(controller.getRoleControl()).catch((err) => {
        expect(err).toEqual(error);
      });
    });
  });
});
