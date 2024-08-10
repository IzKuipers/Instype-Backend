import { Socket } from "socket.io";

export interface Instance {
  nickname: string;
  socket: Socket;
}
