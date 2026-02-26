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

  // Get all attendance records
  getAttendance() {
    return this.prisma.attendance.findMany({
      select: {
        id: true,
        fullname: true,
        schedule: true,
      },
      orderBy: {
        id: 'asc'
      }
    });
  }

  // Get attendance records by schedule
  getAttendanceBySched(schedule: string) {
    return this.prisma.attendance.findMany({
      select: {
        id: true,
        fullname: true,
        schedule: true
      },
      where: {
        schedule: schedule
      }
    })
  }

  // Get a single attendance record by ID
  getAttendanceById(id: number) {
    return this.prisma.attendance.findUnique({ where: { id } });
  }

  // updateAttendance(id: number, data: { fullname: string; schedule: string }) {
  //   return this.prisma.attendance.update({
  //     where: { id },
  //     data,
  //   });
  // }

  // With websocket broadcasting
  async updateAttendance(id: number, data: {fullname: string; schedule: string}) {
    const updated = await this.prisma.attendance.update({
      where: { id },
      data,
    });

    console.log("Broadcasting attendance_update:", updated);
    this.attendanceGateway.server.emit('attendance_update', {
      type: "update",
      data: updated,
    });

    return updated;
  }

}
