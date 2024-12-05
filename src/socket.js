import { io } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

const url = "http://localhost:9000/";

export const socket = io(url, {
  autoConnect: false,
  auth: {
    messageId: uuidv4(),
    username: "Rohit",
  },
});
