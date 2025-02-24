import { Test, TestingModule } from '@nestjs/testing';
import { RtSubmissionsService } from './rt-submissions.service';

describe('RtSubmissionsService', () => {
  let service: RtSubmissionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RtSubmissionsService],
    }).compile();

    service = module.get<RtSubmissionsService>(RtSubmissionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
