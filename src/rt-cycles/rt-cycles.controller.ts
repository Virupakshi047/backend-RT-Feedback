import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { RTCyclesService } from './rt-cycles.service';

@Controller('admin/rt-cycles')
export class RTCyclesController {
  constructor(private readonly rtCyclesService: RTCyclesService) {}

  // Create New RT Cycle
  @Post()
  async createCycle(@Body() data: { startDate: string; endDate: string }) {
    return this.rtCyclesService.createCycle(data.startDate, data.endDate);
  }

  //  Get All RT Cycles
  @Get()
  async getAllCycles() {
    return this.rtCyclesService.getAllCycles();
  }

  //  Get RT Cycle by ID
  @Get(':id')
  async getCycleById(@Param('id') id: string) {
    return this.rtCyclesService.getCycleById(Number(id));
  }
}
