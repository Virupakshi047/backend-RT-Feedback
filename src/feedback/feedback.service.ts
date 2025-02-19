import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { monthlyfeedback } from '@prisma/client';

@Injectable()
export class FeedbackService {
  constructor(private prisma: PrismaService) {}

  async getAllFeedback(): Promise<monthlyfeedback[]> {
    return this.prisma.monthlyfeedback.findMany();
  }

  async getFeedbackById(id: number): Promise<monthlyfeedback | null> {
    return this.prisma.monthlyfeedback.findUnique({ where: { id } });
  }

  async createFeedback(data: { empId: number; feedbackMonth: string; attachmentUrl?: string; isSubmitted?: boolean }): Promise<monthlyfeedback> {
    return this.prisma.monthlyfeedback.create({ data });
  }

  async updateFeedback(id: number, data: Partial<monthlyfeedback>): Promise<monthlyfeedback> {
    return this.prisma.monthlyfeedback.update({ where: { id }, data });
  }

  async deleteFeedback(id: number): Promise<monthlyfeedback> {
    return this.prisma.monthlyfeedback.delete({ where: { id } });
  }
}
