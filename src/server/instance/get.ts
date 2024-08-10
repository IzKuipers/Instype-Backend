import { Socket } from "socket.io";
import { Instance } from "../../types/instance";
import { Instances } from ".";

export function getInstanceByNick(nick: string): Instance | undefined {
  return Instances.filter(({ nickname }) => nickname == nick)[0];
}

export function getInstanceBySocket(sock: Socket): Instance | undefined {
  return Instances.filter(({ socket }) => socket.id == sock.id)[0];
}
