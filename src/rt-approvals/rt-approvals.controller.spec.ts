import { Test, TestingModule } from '@nestjs/testing';
import { RtApprovalsController } from './rt-approvals.controller';

describe('RtApprovalsController', () => {
  let controller: RtApprovalsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RtApprovalsController],
    }).compile();

    controller = module.get<RtApprovalsController>(RtApprovalsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
