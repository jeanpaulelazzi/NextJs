import { Test, TestingModule } from '@nestjs/testing';
import { Authservice } from './auth.service';

describe('AuthService', () => {
  let service: Authservice;
  

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Authservice],
    }).compile();

    service = module.get<Authservice>(Authservice);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
