import { io } from "socket.io-client";
import { url } from "../../constants/routingConstant";
import useSocket from "../../zustand/SocketObject/socketZustand";
import { v4 as uuidv4 } from "uuid";
import useUserDetail from "../../zustand/UserDetails/userDetailZustand";
import { setMessageIdInLocalStorage } from "../../service/localstorage/messageId.localstorage";
import { setUserNameInLocalStorage } from "../../service/localstorage/username.localstorage";

export const useSocketConnection = () => {
  const { setSocket } = useSocket();
  const { setUserDetails } = useUserDetail();

  const initializeSocketInstance = ({ username }) => {
    try {
      const uniqueMessageId = uuidv4();
      setUserNameInLocalStorage(username);
      setMessageIdInLocalStorage(uniqueMessageId);
      setUserDetails({
        username,
        messageId: uniqueMessageId,
      });
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
