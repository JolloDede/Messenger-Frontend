import { io } from "socket.io-client";
import { createContext } from 'react';
import { Socket_API_URL } from "../config.json";

export const socket = io(Socket_API_URL)

export const SocketContext = createContext();