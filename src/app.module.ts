import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { EmployeesModule } from './employees/employees.module';
import { FeedbackModule } from './feedback/feedback.module';
import { RtCyclesModule } from './rt-cycles/rt-cycles.module';
import { RtSubmissionsModule } from './rt-submissions/rt-submissions.module';

@Module({
  imports: [PrismaModule, EmployeesModule, FeedbackModule, RtCyclesModule, RtSubmissionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
