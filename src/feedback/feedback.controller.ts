import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { monthlyfeedback } from '@prisma/client';

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Get()
  getAllFeedback() {
    return this.feedbackService.getAllFeedback();
  }
  @Post()
  createFeedback(@Body() data: { empId: number; feedbackMonth: string; parameters: any[] }) {
    return this.feedbackService.submitMonthlyFeedback(data.empId, data.feedbackMonth, data);
  }
  

  @Put(':id')
  updateFeedback(@Param('id') id: string, @Body() data: Partial<monthlyfeedback>) {
    return this.feedbackService.updateFeedback(Number(id), data);
  }

  @Delete(':id')
  deleteFeedback(@Param('id') id: string) {
    return this.feedbackService.deleteFeedback(Number(id));
  }
  @Get('forms/config/:empId')
  async getFormConfig(@Param('empId') empId: string) {
    return this.feedbackService.getFormConfig(Number(empId));
  }
  @Get(':empId')
  async getMonthlyFeedback(@Param('empId') empId: string) {
    return this.feedbackService.getMonthlyFeedback(Number(empId));
  }
}
