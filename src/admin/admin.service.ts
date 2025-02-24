import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  //  Create Admin
  async createAdmin(data: { name: string; email: string; password: string }) {
    //  Check if admin with same email exists
    const existingAdmin = await this.prisma.admin.findUnique({
      where: { email: data.email },
    });
  
    if (existingAdmin) {
      throw new Error(`Admin with email '${data.email}' already exists.`);
    }
  
    //  Create Admin if email is unique
    return this.prisma.admin.create({ data });
  }

  async loginAdmin(email: string, password: string) {
    // ✅ Check if admin exists
    const admin = await this.prisma.admin.findUnique({
      where: { email },
    });
  
    if (!admin || admin.password !== password) {
      throw new Error('Invalid email or password');
    }
  
    return {
      id: admin.id,
      name: admin.name,
      email: admin.email,
    };
  }
  
  

  //  Get All Admins
  async getAllAdmins() {
    return this.prisma.admin.findMany();
  }

  //  Get Admin by ID
  async getAdminById(adminId: number) {
    return this.prisma.admin.findUnique({ where: { id: adminId } });
  }

  //  Update Admin
  async updateAdmin(adminId: number, data: { name?: string; email?: string; password?: string }) {
    return this.prisma.admin.update({ where: { id: adminId }, data });
  }

  //  Delete Admin
  async deleteAdmin(adminId: number) {
    return this.prisma.admin.delete({ where: { id: adminId } });
  }
}
