import { io } from "socket.io-client";
import { createContext, useContext, useEffect, useState } from 'react';
import { Socket_API_URL } from "../config.json";

const SocketContext = createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ id, children }) {
  const [socket, setSocket] = useState();

  useEffect(() => {
    const newSocket = io(
      Socket_API_URL,
      { query: { id } }
    );
    setSocket(newSocket);

    return () => newSocket.close();
  }, [id]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  )
}