import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { mainTheme } from "./config/themes";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./hooks/auth";
import { ToastProvider } from "./hooks/toast";
ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <ThemeProvider theme={mainTheme}>
      <BrowserRouter>
      <AuthProvider>
          <ToastProvider>
            <App />
          </ToastProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
