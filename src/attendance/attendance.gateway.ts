import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST'],
    credentials: true
  }
})

export class AttendanceGateway {
  @WebSocketServer()
  server: Server;

  broadcastAttendanceCreate(payload: any) {
    this.server.emit('attendance_create', payload);
  }
}