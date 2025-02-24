import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RTApprovalsService {
  constructor(private prisma: PrismaService) {}

  // 🔹 Get All RT Feedback Submissions for a Cycle
  async getRTFeedbackResults(cycleId: number) {
    return this.prisma.rtsubmission.findMany({
      where: { cycleId },
      include: {
        employee: { select: { id: true, name: true, email: true, bandLevel: true } },
      },
      orderBy: { isApproved: 'asc' }, // Sort so pending approvals come first
    });
  }

  // 🔹 Approve or Override RT Feedback Submission
  async updateRTSubmission(submissionId: number, data: { overrideScore?: number; finalGrade?: string; adminComments?: string }) {
    return this.prisma.rtsubmission.update({
      where: { id: submissionId },
      data: {
        adminOverrideScore: data.overrideScore ?? null,
        finalGrade: data.finalGrade ?? null,
        adminComments: data.adminComments ?? null,
        isApproved: true,
      },
    });
  }
}
