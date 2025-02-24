import { Controller, Get, Post, Put, Delete, Body, Param, BadRequestException } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // ✅ Create Admin
  @Post()
  async createAdmin(@Body() data: { name: string; email: string; password: string }) {
    try {
      return await this.adminService.createAdmin(data);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  @Post('login')
  async loginAdmin(@Body() data: { email: string; password: string }) {
    try {
      return await this.adminService.loginAdmin(data.email, data.password);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // Get All Admins
  @Get()
  async getAllAdmins() {
    return this.adminService.getAllAdmins();
  }

  // Get Admin by ID
  @Get(':id')
  async getAdminById(@Param('id') id: string) {
    return this.adminService.getAdminById(Number(id));
  }

  //  Update Admin
  @Put(':id')
  async updateAdmin(@Param('id') id: string, @Body() data: { name?: string; email?: string; password?: string }) {
    try {
      return await this.adminService.updateAdmin(Number(id), data);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // ✅ Delete Admin
  @Delete(':id')
  async deleteAdmin(@Param('id') id: string) {
    try {
      return await this.adminService.deleteAdmin(Number(id));
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
