import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { of, throwError } from 'rxjs';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    usersController = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a user if successful', (done) => {
      const result = { id: 1, name: 'John Doe' };
      jest.spyOn(usersService, 'findOne').mockReturnValue(of(result));

      usersController.findOne(1).subscribe({
        next: (data) => {
          expect(data).toEqual(result);
          done();
        },
      });
    });

    it('should throw an HttpException if an error occurs', (done) => {
      const error = new Error('Server error');
      jest
        .spyOn(usersService, 'findOne')
        .mockReturnValue(throwError(() => error));

      usersController.findOne(1).subscribe({
        next: () => {},
        error: (err) => {
          expect(err).toBeInstanceOf(HttpException);
          expect(err.message).toBe('Server error');
          done();
        },
      });
    });
  });
});
