import { Controller, Get, Put, Param, Body, BadRequestException } from '@nestjs/common';
import { RTApprovalsService } from './rt-approvals.service';

@Controller('admin/rt-approvals')
export class RTApprovalsController {
  constructor(private readonly rtApprovalsService: RTApprovalsService) {}

  // 🔹 Get RT Feedback Results for a Cycle
  @Get(':cycleId/results')
  async getRTFeedbackResults(@Param('cycleId') cycleId: string) {
    return this.rtApprovalsService.getRTFeedbackResults(Number(cycleId));
  }

  // 🔹 Approve or Override RT Submission
  @Put('rt-submissions/:submissionId')
  async updateRTSubmission(
    @Param('submissionId') submissionId: string,
    @Body() data: { overrideScore?: number; finalGrade?: string; adminComments?: string }
  ) {
    try {
      return await this.rtApprovalsService.updateRTSubmission(Number(submissionId), data);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
