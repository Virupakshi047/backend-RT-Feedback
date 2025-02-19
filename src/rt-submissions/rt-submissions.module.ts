import { Module } from '@nestjs/common';
import { RTSubmissionsService } from './rt-submissions.service';
import { RTSubmissionsController } from './rt-submissions.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [RTSubmissionsService],
  controllers: [RTSubmissionsController]
})
export class RtSubmissionsModule {}
