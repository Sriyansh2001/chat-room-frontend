import React, { useEffect } from "react";
import styles from "./ChatView.module.css";
import { Button, TextField } from "@mui/material";
import useChatView from "./hook/useChatView";

export default function ChatView() {
  const {
    messageValue,
    isConnected,
    socketChats,
    connectedUserList,
    disconnectToServer,
    handleConnectWithUserName,
    userDetail,
    onSendMessageClick,
    handleMessageValueChange,
  } = useChatView();

  useEffect(() => {
    handleConnectWithUserName();
    // eslint-disable-next-line
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.outerBox}>
        <div className={styles.chatContainer}>
          <div className={styles.heading}>Team Twinch</div>
          <div className={styles.chatArea}>
            {socketChats?.map(({ message, username, messageId }, index) => {
              return (
                <div
                  className={
                    userDetail?.messageId === messageId
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
          <div className={styles.connectButton}>
            <Button
              onClick={
                isConnected ? disconnectToServer : handleConnectWithUserName
              }
            >
              {isConnected ? "Disconnect" : "Connect"}
            </Button>
          </div>
          <div>
            {Object.keys(connectedUserList)
              ?.filter((userMessageId) => {
                return userMessageId !== userDetail?.messageId;
              })
              ?.map((userMessageId) => {
                return (
                  <div
                    style={{
                      background: `linear-gradient(to left, white, ${connectedUserList[userMessageId]?.color})`,
                    }}
                    className={styles.userListContainer}
                    key={userMessageId}
                  >
                    {connectedUserList[userMessageId]?.username}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
