import { Socket } from "socket.io";
import {
  processText,
  registerInstance,
  unlinkInstanceBySocket,
} from "./instance";
import { updateClients } from "./instance/update";

export async function socketListener(socket: Socket) {
  let timeout: NodeJS.Timeout;

  console.log(`Socket listener: ${socket.id}`);
  socket.on("activate", (nickname: string) => {
    registerInstance(socket, nickname);
    updateClients();
  });

  socket.on("text", (text: string) => {
    clearTimeout(timeout);

    if (socket.disconnected) return;

    timeout = setTimeout(() => {
      unlinkInstanceBySocket(socket);
    }, 600000);

    processText(socket, text);
  });

  socket.on("disconnect", () => {
    clearTimeout(timeout);
    unlinkInstanceBySocket(socket, false);
  });
}
