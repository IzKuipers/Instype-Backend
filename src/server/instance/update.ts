import { Texts } from ".";
import { mainServer } from "..";

export function updateClients() {
  mainServer.emit(`clients`, Texts);
}
