import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import { io } from "socket.io-client";

const SocketContext = createContext(); // Capitalize the context name

// Custom hook to use the SocketContext
export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [authUser] = useAuth();

  useEffect(() => {
    if (authUser) {
      const socketInstance = io("https://chatapp-w8gc.onrender.com", {
        query: {
          userId: authUser.user._id,
        },
      });
      setSocket(socketInstance);

      socketInstance.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      return () => {
        socketInstance.close(); // Cleanup the socket connection
        setSocket(null); // Reset socket state to null on cleanup
      };
    } else {
      // Ensure that the socket is closed if the user logs out
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
