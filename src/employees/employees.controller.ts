import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { employee } from '@prisma/client';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get()
  getAllEmployees() {
    return this.employeesService.getAllEmployees();
  }

  @Get(':id')
  getEmployeeById(@Param('id') id: string) {
    return this.employeesService.getEmployeeById(Number(id));
  }

  @Post()
  createEmployee(@Body() data: { name: string; email: string; password: string; bandLevel: string; managerId?: number }) {
    return this.employeesService.createEmployee(data);
  }

  @Put(':id')
  updateEmployee(@Param('id') id: string, @Body() data: Partial<employee>) {
    return this.employeesService.updateEmployee(Number(id), data);
  }

  @Delete(':id')
  deleteEmployee(@Param('id') id: string) {
    return this.employeesService.deleteEmployee(Number(id));
  }
}
