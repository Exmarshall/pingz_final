import { getSocket } from "./socket";

export const listenUpdateProfile = (
  callback: (res: any) => void,
  off: boolean = false
) => {
  const socket = getSocket();
  if (!socket) return;

  if (off) {
    socket.off("updateProfile", callback);
  } else {
    socket.on("updateProfile", callback);
  }
};

export const emitUpdateProfile = (payload: any) => {
  const socket = getSocket();
  if (!socket) return;

  socket.emit("updateProfile", payload);
};
