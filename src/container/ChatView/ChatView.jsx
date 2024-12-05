import React, { useEffect, useState } from "react";
import styles from "./ChatView.module.css";
import { Button, TextField } from "@mui/material";
import useSocketEvents from "../../hook/SocketEvents/useSocketEvents";
import useUserDetail from "../../zustand/UserDetails/userDetailZustand";

export default function ChatView() {
  const [messageValue, setMessageValue] = useState("");

  const {
    isConnected,
    socketChats,
    disconnectToServer,
    onMessageSend,
    handleConnectWithUserName,
  } = useSocketEvents();
  const { userDetail } = useUserDetail();

  useEffect(() => {
    handleConnectWithUserName();
    // eslint-disable-next-line
  }, []);

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
        <div className={styles.heading}>Team Twinch</div>
        <div className={styles.chatArea}>
          {socketChats?.map(({ message, username, messageId }, index) => {
            return (
              <div
                className={
                  userDetail?.messageId == messageId
                    ? styles.sendedMessage
                    : styles.receivedMessage
                }
                key={index}
              >
                <div className={styles.username}>{username}</div>
                <div className={styles.message}>{message}</div>
              </div>
            );
          })}
        </div>
        <div className={styles.inputTextContainer}>
          <TextField
            value={messageValue}
            label="Write your message"
            multiline
            maxRows={4}
            sx={{
              flex: 1,
            }}
            onChange={(e) => handleMessageValueChange(e?.target?.value)}
            onKeyDown={(e) => {
              if (e?.key === "Enter") {
                if (!e?.shiftKey) {
                  onSendMessageClick();
                }
              }
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
