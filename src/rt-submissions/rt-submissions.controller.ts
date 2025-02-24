import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { RTSubmissionsService } from './rt-submissions.service';

@Controller('employee/rt-cycles')
export class RTSubmissionsController {
  constructor(private readonly rtSubmissionsService: RTSubmissionsService) {}

  //  Get Active RT Cycle
  @Get('active/:empId')
  async getActiveRTCycle(@Param('empId') empId: string) {
    return this.rtSubmissionsService.getActiveRTCycle(Number(empId));
  }

  //  Get Collated Feedback for RT Cycle
  @Get(':cycleId/collated-feedback/:empId')
  async getCollatedFeedback(@Param('cycleId') cycleId: string, @Param('empId') empId: string) {
    return this.rtSubmissionsService.getCollatedFeedback(Number(empId), Number(cycleId));
  }

  //  Submit RT Feedback
  @Post(':cycleId/submit')
  async submitRTFeedback(@Param('cycleId') cycleId: string, @Body() data: { empId: number; additionalComments: string }) {
    return this.rtSubmissionsService.submitRTFeedback(data.empId, Number(cycleId), data.additionalComments);
  }
}
