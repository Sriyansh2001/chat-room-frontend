import { io } from "socket.io-client";
import { url } from "../../constants/routingConstant";
import useSocket from "../../zustand/SocketObject/socketZustand";
import { v4 as uuidv4 } from "uuid";

export const useSocketConnection = () => {
  const { setSocket } = useSocket();

  const initializeSocketInstance = ({ username }) => {
    try {
      const uniqueMessageId = uuidv4();
      const socket = io(url, {
        autoConnect: false,
        auth: {
          messageId: uniqueMessageId,
          username: username,
        },
      });
      setSocket(socket);
    } catch (err) {
      console.error(err);
    }
  };

  return {
    initializeSocketInstance,
  };
};
