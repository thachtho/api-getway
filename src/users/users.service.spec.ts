import { Test, TestingModule } from '@nestjs/testing';
import { ClientKafka } from '@nestjs/microservices';
import { of } from 'rxjs';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let clientKafka: jest.Mocked<ClientKafka>;

  beforeEach(async () => {
    const clientKafkaMock = {
      subscribeToResponseOf: jest.fn(),
      send: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: 'USER_MICROSERVICE',
          useValue: clientKafkaMock,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    clientKafka = module.get<ClientKafka>(
      'USER_MICROSERVICE',
    ) as jest.Mocked<ClientKafka>;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('onModuleInit', () => {
    it('should subscribe to get-user response', () => {
      service.onModuleInit();
      expect(
        jest.spyOn(clientKafka, 'subscribeToResponseOf'),
      ).toHaveBeenCalledWith('get-user');
    });
  });

  describe('findOne', () => {
    it('should send a message to get-user topic', () => {
      const userId = 1;
      service.findOne(userId);
      expect(jest.spyOn(clientKafka, 'send')).toHaveBeenCalledWith(
        'get-user',
        JSON.stringify({ userId }),
      );
    });

    it('should return an observable with the expected result', (done) => {
      const result = { id: 1, name: 'John Doe' };
      jest.spyOn(clientKafka, 'send').mockReturnValue(of(result));

      const userId = 1;
      service.findOne(userId).subscribe((data) => {
        expect(data).toEqual(result);
        done();
      });
    });
  });
});
