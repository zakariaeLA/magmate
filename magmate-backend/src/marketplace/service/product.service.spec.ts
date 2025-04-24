import { Test, TestingModule } from '@nestjs/testing';
import { ProduitService } from './product.service';

describe('ProductService', () => {
  let service: ProduitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProduitService],
    }).compile();

    service = module.get<ProduitService>(ProduitService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
