import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { InsertAttendanceDto } from './dto/insert-attendance.dto';
import { AttendanceGateway } from './attendance.gateway';

@Injectable()
export class AttendanceService {
  constructor(
    private prisma: PrismaService,
    private attendanceGateway: AttendanceGateway
  ) {}

  // createAttendance(dto: InsertAttendanceDto) {
  //   return this.prisma.attendance.create({
  //     data: dto,
  //   });
  // }

  // With websocket broadcasting
  async createAttendance(dto: InsertAttendanceDto) {
    const created = await this.prisma.attendance.create({
      data: dto,
    });

    this.attendanceGateway.server.emit('attendance_create', {
      type: "create",
      data: created,
    });

    return created;
  }

  getAttendance() {
    return this.prisma.attendance.findMany({
      select: {
        id: true,
        fullname: true,
        schedule: true,
      },
    });
  }

  getAttendanceById(id: number) {
    return this.prisma.attendance.findUnique({ where: { id } });
  }

  updateAttendance(id: number, data: { fullname: string; schedule: string }) {
    return this.prisma.attendance.update({
      where: { id },
      data,
    });
  }

}
