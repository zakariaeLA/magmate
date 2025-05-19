import { Test, TestingModule } from '@nestjs/testing';
import { MessagerieGateway } from './messagerie.gateway';

describe('MessagerieGateway', () => {
  let gateway: MessagerieGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MessagerieGateway],
    }).compile();

    gateway = module.get<MessagerieGateway>(MessagerieGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
