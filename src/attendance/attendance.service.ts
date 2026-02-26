import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { InsertAttendanceDto } from './dto/insert-attendance.dto';
import { AttendanceGateway } from './attendance.gateway';
import { nanoid } from 'nanoid';

@Injectable()
export class AttendanceService {
  constructor(
    private prisma: PrismaService,
    private attendanceGateway: AttendanceGateway,
  ) {}

  // createAttendance(dto: InsertAttendanceDto) {
  //   return this.prisma.attendance.create({
  //     data: dto,
  //   });
  // }

  // With websocket broadcasting
  async createAttendance(dto: InsertAttendanceDto) {
    const random_RefId = nanoid(10);
    const created = await this.prisma.attendance.create({
      data: {
        ref_id: random_RefId,
        fullname: dto.fullname,
        schedule: dto.schedule,
      },
    });

    this.attendanceGateway.server.emit('attendance_create', {
      type: 'create',
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
  //get user by unique reference id
  async getUserByRefId(ref_id: string) {
    if (!ref_id?.trim()) {
      throw new BadRequestException('REFERENCE ID IS REQUIRED');
    }
    const attendee = await this.prisma.attendance.findFirst({
      where: { ref_id },
    });
    return attendee;
  }

  updateAttendance(id: number, data: { fullname: string; schedule: string }) {
    return this.prisma.attendance.update({
      where: { id },
      data,
    });
  }
}
