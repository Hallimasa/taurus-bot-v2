import { Test, TestingModule } from '@nestjs/testing';
import { WarframeService } from './warframe.service';

describe('WarframeService', () => {
  let service: WarframeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WarframeService]
    }).compile();

    service = module.get<WarframeService>(WarframeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
