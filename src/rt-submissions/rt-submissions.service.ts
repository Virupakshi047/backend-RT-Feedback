import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RTSubmissionsService {
  constructor(private prisma: PrismaService) {}

  //  Get Active RT Cycle for an Employee
  async getActiveRTCycle(empId: number) {
    return this.prisma.rtcycle.findFirst({
      where: { status: 'ACTIVE' },
      include: {
        rtsubmission: {
          where: { empId },  // Check if employee already submitted
        },
      },
    });
  }

  //  Get Collated Monthly Feedback for RT Submission
  async getCollatedFeedback(empId: number, cycleId: number) {
    console.log(`Fetching RT Cycle ${cycleId} for Employee ${empId}`);
  
    // Get RT Cycle details
    const cycle = await this.prisma.rtcycle.findUnique({ where: { id: cycleId } });
  
    if (!cycle) {
      throw new Error("RT Cycle not found");
    }
  
    const cycleStartMonth = cycle.startDate.toISOString().slice(0, 7);
    console.log(`Looking for feedbackMonth: ${cycleStartMonth}`);
  
    // Fetch Monthly Feedbacks
    const monthlyFeedbacks = await this.prisma.monthlyfeedback.findMany({
      where: {
        empId,
        feedbackMonth: cycleStartMonth, //  Ensure format matches YYYY-MM
      },
      include: {
        feedbackscore: {
          include: {
            feedbackparameter: true,
          },
        },
      },
    });
  
    console.log("Fetched Feedbacks:", monthlyFeedbacks);
  
    return {
      empId,
      cycleId,
      monthlyFeedbacks: monthlyFeedbacks.map(feedback => ({
        id: feedback.id,
        feedbackMonth: feedback.feedbackMonth,
        scores: feedback.feedbackscore.map(score => ({
          name: score.feedbackparameter?.paramName || "Unknown Parameter",
          score: score.score,
          comments: score.comments,
        })),
      })),
    };
  }
  
  
  
  

  //  Submit RT Feedback
  async submitRTFeedback(empId: number, cycleId: number, additionalComments: string) {
    // Check if employee has 75% feedback for the cycle
    const cycle = await this.prisma.rtcycle.findUnique({ where: { id: cycleId } });
    const feedbackCount = await this.prisma.monthlyfeedback.count({ where: { empId, feedbackMonth: { contains: cycleId.toString() } } });

    if (!cycle) {
      throw new Error('Cycle not found');
    }
    const totalMonths = (new Date(cycle.endDate).getMonth() - new Date(cycle.startDate).getMonth()) + 1;
    const requiredFeedbacks = Math.ceil(totalMonths * 0.75);

    if (feedbackCount < requiredFeedbacks) {
      throw new Error(`Minimum ${requiredFeedbacks} feedbacks required, you have ${feedbackCount}`);
    }

    // Create RT Submission
    return this.prisma.rtsubmission.create({
      data: {
        empId,
        cycleId,
        additionalComments,
        calculatedScore: 0,  // Placeholder, calculated later
        finalGrade: null,
        isApproved: false,
      },
    });
  }
}
