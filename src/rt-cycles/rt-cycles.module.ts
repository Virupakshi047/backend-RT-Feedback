import { Module } from '@nestjs/common';
import { RTCyclesService } from './rt-cycles.service';
import { RTCyclesController } from './rt-cycles.controller';
import { PrismaModule } from '../prisma/prisma.module';
@Module({
  imports: [PrismaModule],
  providers: [RTCyclesService],
  controllers: [RTCyclesController]
})
export class RtCyclesModule {}
