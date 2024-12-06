import { useEffect, useState } from "react";
import { EVENT_TYPE } from "./constants/socketEvent.constants";
import useSocket from "../../zustand/SocketObject/socketZustand";

export default function useSocketEvents() {
  const { socket } = useSocket();
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [socketChats, setSocketChats] = useState([]);
  const [connectedUserList, setConnectedUserList] = useState({});

  useEffect(() => {
    socket.on(EVENT_TYPE.connect, onConnectToChat);
    socket.on(EVENT_TYPE.disconnect, onDisconnectToChat);
    socket.on(EVENT_TYPE.chatMessage, onUserMessage);
    socket.on(EVENT_TYPE.newUserConnected, handleNewUserConnected);
    socket.on(EVENT_TYPE.connectedUserList, handleSetConnectedUserList);

    return () => {
      socket.off(EVENT_TYPE.connect, onConnectToChat);
      socket.off(EVENT_TYPE.disconnect, onDisconnectToChat);
      socket.off(EVENT_TYPE.chatMessage, onUserMessage);
      socket.off(EVENT_TYPE.newUserConnected, handleNewUserConnected);
      socket.off(EVENT_TYPE.connectedUserList, handleSetConnectedUserList);
    };
    // eslint-disable-next-line
  }, []);

  const onConnectToChat = () => {
    setIsConnected(true);
  };

  const onDisconnectToChat = () => {
    setIsConnected(false);
  };

  const disconnectToServer = () => {
    try {
      if (isConnected) {
        socket.disconnect();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSetConnectedUserList = ({ connectedUserList }) => {
    console.log(connectedUserList);
    setConnectedUserList(connectedUserList);
  };

  const onUserMessage = (newChat) => {
    setSocketChats((prev) => [
      {
        message: newChat?.message,
        username: newChat?.username,
        messageId: newChat?.messageId,
      },
      ...prev,
    ]);
  };

  const onMessageSend = (message) => {
    try {
      const trimedMessage = message?.trim();
      if (trimedMessage && isConnected) {
        socket.emit(EVENT_TYPE.chatMessage, { message: trimedMessage });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleNewUserConnected = ({ username }) => {
    alert(`new user connected ${username}`);
  };

  const handleConnectWithUserName = () => {
    try {
      socket.connect();
    } catch (err) {
      console.error(err);
    }
  };

  return {
    isConnected,
    socketChats,
    connectedUserList,
    onMessageSend,
    disconnectToServer,
    handleConnectWithUserName,
  };
}
