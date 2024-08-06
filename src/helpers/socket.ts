import { URL } from "api";
import { io } from "socket.io-client";

export const socket = (token: string) =>
  io(URL, {
    autoConnect: false,
    extraHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
