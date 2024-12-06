import { io } from "socket.io-client";
import { create } from "zustand";
import { url } from "../../constants/routingConstant";
import { getMessageIdFromLocalStorage } from "../../service/localstorage/messageId.localstorage";
import { getUserNameFromLocalStorage } from "../../service/localstorage/username.localstorage";

const useSocket = create((set) => ({
  socket: io(url, {
    autoConnect: false,
    auth: {
      messageId: getMessageIdFromLocalStorage(),
      username: getUserNameFromLocalStorage(),
    },
  }),
  setSocket: (socketValue) => {
    set({ socket: socketValue });
  },
}));

export default useSocket;
