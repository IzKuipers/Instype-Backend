import { Socket } from "socket.io";
import { Instance } from "../../types/instance";
import { mainServer } from "..";
import { getInstanceByNick, getInstanceBySocket } from "./get";

export const Instances: Instance[] = [];
export const Texts: Record</*nick*/ string, /*content*/ string> = {};

export function registerInstance(socket: Socket, nickname: string) {
  console.log(`Registering ${socket.id} as "${nickname}"`);

  socket.emit("connected");

  Instances.push({ socket, nickname });

  mainServer.emit(`join`, nickname);
}

export function unlinkInstance(nickname: string) {
  const instance = getInstanceByNick(nickname);

  if (!instance) return;

  mainServer.emit(`leave`, nickname);
  instance.socket.disconnect();
}

export function unlinkInstanceBySocket(socket: Socket) {
  const instance = getInstanceBySocket(socket);

  if (!instance) return;

  mainServer.emit(`leave`, instance.nickname);
  instance.socket.disconnect();
}

export function processText(socket: Socket, content: string) {
  const instance = getInstanceBySocket(socket);

  if (!instance) return;

  mainServer.emit(`update-text`, instance.nickname, content);

  Texts[instance.nickname] = content;
}