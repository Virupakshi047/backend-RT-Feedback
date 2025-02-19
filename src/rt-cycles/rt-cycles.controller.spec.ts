import { Test, TestingModule } from '@nestjs/testing';
import { RtCyclesController } from './rt-cycles.controller';

describe('RtCyclesController', () => {
  let controller: RtCyclesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RtCyclesController],
    }).compile();

    controller = module.get<RtCyclesController>(RtCyclesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
