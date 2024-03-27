import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import AuthContext from "./Context/AuthContext.jsx";
import { ThemeProvider } from "@emotion/react";
import "./assets/main.css";
import { theme } from "./theme.jsx";
import SocketContext from "./Context/SocketContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContext>
    <SocketContext>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </SocketContext>
  </AuthContext>
);
