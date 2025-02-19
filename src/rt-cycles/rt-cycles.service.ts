import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { rtcycle } from '@prisma/client';

@Injectable()
export class RTCyclesService {
  constructor(private prisma: PrismaService) {}

  //Create a New RT Cycle
  async createCycle(startDate: string, endDate: string): Promise<rtcycle> {
    return this.prisma.rtcycle.create({
      data: {
        startDate: new Date(startDate),  // Converting to Date type
        endDate: new Date(endDate),
        status: 'ACTIVE',
      },
    });
  }

  // Get All RT Cycles (Active & Completed)
  async getAllCycles(): Promise<any[]> {
    const cycles = await this.prisma.rtcycle.findMany({
      orderBy: { startDate: 'desc' },
    });

    return cycles.map(cycle => ({
      id: cycle.id,
      startDate: cycle.startDate.toISOString().split('T')[0], // Format YYYY-MM-DD
      endDate: cycle.endDate.toISOString().split('T')[0], //  Format YYYY-MM-DD
      status: cycle.status,
    }));
  }


  //  Get a Specific RT Cycle by ID
  async getCycleById(id: number): Promise<any> {
    const cycle = await this.prisma.rtcycle.findUnique({
      where: { id },
      include: {
        rtsubmission: true, // Include RT submissions for this cycle
      },
    });

    if (!cycle) return null;

    return {
      id: cycle.id,
      startDate: cycle.startDate.toISOString().split('T')[0], // ✅ Format YYYY-MM-DD
      endDate: cycle.endDate.toISOString().split('T')[0], // ✅ Format YYYY-MM-DD
      status: cycle.status,
      submissions: cycle.rtsubmission,
    };
  }
}
