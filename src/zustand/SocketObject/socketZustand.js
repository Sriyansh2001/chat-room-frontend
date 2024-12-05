import { io } from "socket.io-client";
import { create } from "zustand";
import { url } from "../../constants/routingConstant";

const useSocket = create((set) => ({
  socket: io(url, {
    autoConnect: false,
  }),
  setSocket: (socketValue) => {
    set({ socket: socketValue });
  },
}));

export default useSocket;
