import { Server } from "socket.io";
import { unlinkInstanceBySocket } from "./instance";
import { socketListener } from "./listener";

export let mainServer: Server;

export function startServer(port: number = 9898) {
  mainServer = new Server(port, {
    cors: { origin: "*" },
    maxHttpBufferSize: 1e5,
  });

  mainServer.on("connection", socketListener);

  mainServer.on("disconnect", (socket) => {
    unlinkInstanceBySocket(socket);
  });

  console.log(`Started server on port ${port}`);
}
