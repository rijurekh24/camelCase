import { createContext, useContext, useEffect, useState } from "react";
import { socket } from "../Utils/socket";
import { authContext } from "./AuthContext";
import Api from "../Utils/api";

const socketContext = createContext();

const SocketContext = ({ children }) => {
  const ctx = useContext(authContext);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [notification, setNotification] = useState([]);

  function onConnect() {
    setIsConnected(true);
  }

  function onDisconnect() {
    setIsConnected(false);
  }

  const fetchNotification = () => {
    Api.post("/notifications/get-all/", {
      user_id: ctx.user._id,
    }).then((res) => {
      setNotification(res.data.notifications);
    });
  };

  useEffect(() => {
    if (ctx.user) {
      socket.emit("setup", { id: ctx.user._id });
      fetchNotification();
    }
  }, [ctx.user]);

  useEffect(() => {
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("connected", (e) => {
      //   console.log(e);
    });
    socket.on("notification", (data) =>
      setNotification((prev) => [data, ...prev])
    );

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  const value = { notification, fetchNotification };
  return (
    <socketContext.Provider value={value}>{children}</socketContext.Provider>
  );
};

export default SocketContext;

export { socketContext };
