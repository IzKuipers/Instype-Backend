import { Socket } from "socket.io";
import { Instance } from "../../types/instance";
import { mainServer } from "..";
import { getInstanceByNick, getInstanceBySocket } from "./get";
import { updateClients } from "./update";

export const Instances: Instance[] = [];
export const Texts: Record</*nick*/ string, /*content*/ string> = {};

export function registerInstance(socket: Socket, nickname: string) {
  const instance = getInstanceByNick(nickname);

  if (instance) {
    socket.disconnect();
    return;
  }
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

export function unlinkInstanceBySocket(socket: Socket, disconnect = true) {
  const instance = getInstanceBySocket(socket);

  if (!instance) return;

  Instances.splice(Instances.indexOf(instance), 1);

  mainServer.emit(`leave`, instance.nickname);
  delete Texts[instance.nickname];
  updateClients();

  if (disconnect) instance.socket.disconnect();
}

export function processText(socket: Socket, content: string) {
  const instance = getInstanceBySocket(socket);

  if (!instance) return;

  mainServer.emit(`update-text`, instance.nickname, content);

  Texts[instance.nickname] = content;
}
