import { Module } from '@nestjs/common';
import { RTApprovalsService } from './rt-approvals.service';
import { RTApprovalsController } from './rt-approvals.controller';
// import { PrismaService } from '../prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [RTApprovalsService],
  controllers: [RTApprovalsController]
})
export class RtApprovalsModule {}
