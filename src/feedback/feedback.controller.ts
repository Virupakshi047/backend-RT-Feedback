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

  @Get(':id')
  getFeedbackById(@Param('id') id: string) {
    return this.feedbackService.getFeedbackById(Number(id));
  }

  @Post()
  createFeedback(@Body() data: { empId: number; feedbackMonth: string; attachmentUrl?: string; isSubmitted?: boolean }) {
    return this.feedbackService.createFeedback(data);
  }

  @Put(':id')
  updateFeedback(@Param('id') id: string, @Body() data: Partial<monthlyfeedback>) {
    return this.feedbackService.updateFeedback(Number(id), data);
  }

  @Delete(':id')
  deleteFeedback(@Param('id') id: string) {
    return this.feedbackService.deleteFeedback(Number(id));
  }
}
