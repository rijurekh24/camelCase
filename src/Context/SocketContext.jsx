import { createContext, useContext, useEffect, useState } from "react";
import { socket } from "../Utils/socket";
import { authContext } from "./AuthContext";
import Api from "../Utils/api";
import { toast } from "react-toastify";

const socketContext = createContext();

const SocketContext = ({ children }) => {
  const ctx = useContext(authContext);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [notification, setNotification] = useState([]);
  const [newNotCount, setNewNotCount] = useState(0);

  function onConnect() {
    setIsConnected(true);
  }

  function onDisconnect() {
    setIsConnected(false);
  }

  function notifyMe(title) {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
      const notification = new Notification(title);
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          const notification = new Notification(title);
        }
      });
    }
  }

  const fetchNotification = () => {
    Api.post("/notifications/get-all/", {
      user_id: ctx.user._id,
    }).then((res) => {
      setNotification(res.data.notifications);
      localStorage.setItem(
        `lnid_${ctx.user._id}`,
        res.data.notifications[0]?._id
      );
    });
  };

  useEffect(() => {
    if (ctx.user) {
      socket.emit("setup", { id: ctx.user._id });
      Api.post("/notifications/get-all/", {
        user_id: ctx.user._id,
      }).then((res) => {
        setNotification(res.data.notifications);
      });
    }
  }, [ctx.user]);

  useEffect(() => {
    const lnid = localStorage.getItem(`lnid_${ctx.user?._id}`) || 0;
    let val = 0;

    for (let i = 0; i < notification.length; i++) {
      if (notification[i]._id != lnid) {
        val++;
      } else {
        break;
      }
    }
    setNewNotCount(val);
  }, [notification]);

  useEffect(() => {
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("connected", (e) => {
      //   console.log(e);
    });
    socket.on("notification", (data) => {
      {
        setNotification((prev) => [data, ...prev]);
        notifyMe(data?.title);
        // toast(data?.title, {
        //   autoClose: 2000,
        //   theme: "dark",
        //   icon: "❤️",
        // });
      }
    });

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  const value = { notification, fetchNotification, newNotCount };
  return (
    <socketContext.Provider value={value}>{children}</socketContext.Provider>
  );
};

export default SocketContext;

export { socketContext };
