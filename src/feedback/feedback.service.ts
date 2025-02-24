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

  async getFormConfig(empId:number){
    const employee = await this.prisma.employee.findUnique({
      where:{id:empId},
      select:{bandLevel:true},
    });
    if(!employee){
      throw new Error('Employee not found');
    }
    const parameters = await this.prisma.feedbackparameter.findMany({
      where: { bandLevel: employee.bandLevel, isActive: true },
      select: { id: true, paramName: true },
    });
    return {
      bandLevel: employee.bandLevel,
      fields: parameters.map((param) => ({
        id: param.id,
        name: param.paramName,
        type: 'rating',
        maxScore: 10,
      })),
    };
  }
  async submitMonthlyFeedback(empId: number, feedbackMonth: string, data: { parameters: { name: string; score?: number; text?: string }[] }) {
    if (!feedbackMonth.match(/^\d{2}-\d{4}$/)) {
      throw new Error('Invalid feedback month format. Use MM-YYYY.');
    }
  
    // Check if feedback already exists for the selected month
    const existingFeedback = await this.prisma.monthlyfeedback.findFirst({
      where: { empId, feedbackMonth },
    });
  
    if (existingFeedback) {
      throw new Error(`Feedback for ${feedbackMonth} already exists.`);
    }
  
    //  Step 1: Create Monthly Feedback Entry
    const feedbackEntry = await this.prisma.monthlyfeedback.create({
      data: { empId, feedbackMonth, isSubmitted: true },
    });
  
    //  Step 2: Insert Scores into FeedbackScore Table
    await Promise.all(
      data.parameters.map(async (param) => {
        // ✅ Fetch `paramId` based on the `parameterName` (assuming param.name is the name of the parameter)
        const feedbackParam = await this.prisma.feedbackparameter.findFirst({
          where: { paramName: param.name },
          select: { id: true },
        });
    
        if (!feedbackParam) {
          throw new Error(`Parameter "${param.name}" not found in feedback parameters.`);
        }
    
        await this.prisma.feedbackscore.create({
          data: {
            feedbackId: feedbackEntry.id, //  Use correct foreign key reference
            paramId: feedbackParam.id, //  `paramId` is a number
            score: typeof param.score === 'number' ? param.score : 0, //  Ensure number or null
            comments: param.text ?? null, //  Store text feedback
          },
        });
      })
    );

  
    return { feedbackEntry, message: 'Feedback submitted successfully!' };
  }

  async getMonthlyFeedback(empId: number) {
    const feedbacks = await this.prisma.monthlyfeedback.findMany({
      where: { empId },
      include: {
        feedbackscore: {
          include: {
            feedbackparameter: true, // Fetch parameter details
          },
        },
      },
      orderBy: { feedbackMonth: 'asc' },
    });

    return {
      empId,
      monthlyFeedbacks: feedbacks.map((feedback) => ({
        id: feedback.id,
        feedbackMonth: feedback.feedbackMonth,
        scores: feedback.feedbackscore.map((score) => ({
          name: score.feedbackparameter.paramName,
          score: score.score,
          comments: score.comments,
        })),
      })),
    };
  }

}
