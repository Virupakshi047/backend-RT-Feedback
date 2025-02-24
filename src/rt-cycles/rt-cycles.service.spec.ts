import { Test, TestingModule } from '@nestjs/testing';
import { RtCyclesService } from './rt-cycles.service';

describe('RtCyclesService', () => {
  let service: RtCyclesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RtCyclesService],
    }).compile();

    service = module.get<RtCyclesService>(RtCyclesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
