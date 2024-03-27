import { io } from "socket.io-client";

const URL = "wss://camelcase.onrender.com";

export const socket = io(URL);
