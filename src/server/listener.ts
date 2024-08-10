import { Socket } from "socket.io";
import {
  processText,
  registerInstance,
  unlinkInstanceBySocket,
} from "./instance";

export async function socketListener(socket: Socket) {
  socket.on("activate", (nickname: string) => {
    registerInstance(socket, nickname);
  });

  socket.on("text", (text: string) => {
    processText(socket, text);
  });

  socket.on("disconnect", () => {
    unlinkInstanceBySocket(socket);
  });
}
