import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  // Check admin details
  getAdmin() {
    return this.prisma.admin.findMany({
      select: {
        id: true,
        username: true,
        password: true,
      },
    });
  }

  // Login method
  async login(username: string, password: string) {
    return this.prisma.admin.findFirst({
      where: {
        username,
        password,
      },
    });
  }
}
