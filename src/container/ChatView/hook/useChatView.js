import { useState } from "react";
import useSocketEvents from "../../../hook/SocketEvents/useSocketEvents";
import useUserDetail from "../../../zustand/UserDetails/userDetailZustand";

export default function useChatView() {
  const [messageValue, setMessageValue] = useState("");

  const {
    isConnected,
    socketChats,
    connectedUserList,
    disconnectToServer,
    onMessageSend,
    handleConnectWithUserName,
  } = useSocketEvents();
  const { userDetail } = useUserDetail();

  const onSendMessageClick = () => {
    onMessageSend(messageValue);
    handleMessageValueChange("");
  };

  const handleMessageValueChange = (value) => {
    setMessageValue(value);
  };

  return {
    isConnected,
    messageValue,
    socketChats,
    connectedUserList,
    disconnectToServer,
    handleConnectWithUserName,
    userDetail,
    onSendMessageClick,
    handleMessageValueChange,
  };
}
