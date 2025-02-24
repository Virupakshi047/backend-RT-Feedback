import { Test, TestingModule } from '@nestjs/testing';
import { RtSubmissionsController } from './rt-submissions.controller';

describe('RtSubmissionsController', () => {
  let controller: RtSubmissionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RtSubmissionsController],
    }).compile();

    controller = module.get<RtSubmissionsController>(RtSubmissionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
