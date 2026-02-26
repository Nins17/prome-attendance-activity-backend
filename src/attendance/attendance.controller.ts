import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { InsertAttendanceDto } from './dto/insert-attendance.dto';

@Controller('attendance')
export class AttendanceController {
  constructor(private attendanceService: AttendanceService) {}

  @Post()
  createAttendance(@Body() dto: InsertAttendanceDto) {
    return this.attendanceService.createAttendance(dto);
  }

  @Get()
  getAttendance() {
    return this.attendanceService.getAttendance();
  }

  // attendance.controller.ts
  @Get(':id')
  getAttendanceById(@Param('id') id: string) {
    return this.attendanceService.getAttendanceById(+id);
  }

  @Patch(':id')
  updateAttendance(
    @Param('id') id: string,
    @Body() body: { fullname: string; schedule: string },
  ) {
    return this.attendanceService.updateAttendance(+id, body);
  }

  // Get attendance records by schedule
  @Get('schedule/:schedule')
  getAttendanceBySched(@Param('schedule') schedule: string) {
    return this.attendanceService.getAttendanceBySched(schedule);
  }
}
