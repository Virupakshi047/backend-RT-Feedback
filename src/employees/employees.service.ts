import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { employee } from '@prisma/client';

@Injectable()
export class EmployeesService {
  constructor(private prisma: PrismaService) {}

  async getAllEmployees(): Promise<employee[]> {
    return this.prisma.employee.findMany();
  }

  async getEmployeeById(id: number): Promise<employee | null> {
    return this.prisma.employee.findUnique({ where: { id } });
  }


  async createEmployee(data: { name: string; email: string; password: string; bandLevel: string; managerId?: number }): Promise<employee> {
    if (data.managerId) {
      const managerExists = await this.prisma.employee.findUnique({
        where: { id: data.managerId }
      });
  
      if (!managerExists) {
        throw new Error(`Manager with ID ${data.managerId} does not exist.`);
      }
    }
  
    return this.prisma.employee.create({
      data
    });
  }


  // login function for employee
    async loginEmployee(email: string, password: string) {
      const employee = await this.prisma.employee.findUnique({ where: { email } });
  
      if (!employee) {
        throw new BadRequestException('Invalid email or password');
      }
  
      if (employee.password !== password) {
        throw new BadRequestException('Invalid email or password');
      }
  
      return {
        status: 'success',
        message: 'Login successful',
        user: {
          id: employee.id,
          name: employee.name,
          email: employee.email,
          bandLevel: employee.bandLevel,
          managerId: employee.managerId,
        },
      };
    }
  

  async updateEmployee(id: number, data: Partial<employee>): Promise<employee> {
    return this.prisma.employee.update({ where: { id }, data });
  }

  async deleteEmployee(id: number): Promise<employee> {
    return this.prisma.employee.delete({ where: { id } });
  }
}
