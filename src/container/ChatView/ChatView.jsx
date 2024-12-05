import React, { useEffect, useState } from "react";
import styles from "./ChatView.module.css";
import { Button, TextField } from "@mui/material";
import useSocketEvents from "../../hook/SocketEvents/useSocketEvents";

export default function ChatView() {
  const {
    isConnected,
    socketChats,
    disconnectToServer,
    onMessageSend,
    handleConnectWithUserName,
  } = useSocketEvents();

  useEffect(() => {
    handleConnectWithUserName();
    // eslint-disable-next-line
  }, []);

  const [messageValue, setMessageValue] = useState("");

  const onSendMessageClick = () => {
    onMessageSend(messageValue);
    handleMessageValueChange("");
  };

  const handleMessageValueChange = (value) => {
    setMessageValue(value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.chatContainer}>
        <div>
          <div>Chat Area</div>
          <div>
            {socketChats?.map(({ message, username, messageId }, index) => {
              return (
                <div key={index}>
                  <div className={styles.username}>{username}</div>
                  <div className={styles.message}>{message}</div>
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.inputTextContainer}>
          <TextField
            value={messageValue}
            onChange={(e) => handleMessageValueChange(e?.target?.value)}
            onKeyDown={(e) => {
              if (e?.key === "Enter") onSendMessageClick();
            }}
          />
          <Button onClick={onSendMessageClick}>Send</Button>
        </div>
      </div>
      <div className={styles.userView}>
        <div>
          <Button
            onClick={
              isConnected ? disconnectToServer : handleConnectWithUserName
            }
          >
            {isConnected ? "Disconnect" : "Connect"}
          </Button>
        </div>
        <div>User Area</div>
      </div>
    </div>
  );
}
