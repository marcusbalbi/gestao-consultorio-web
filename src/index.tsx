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
import LoadingProvider from "./hooks/loading/LoadingProvider";
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
import brSaLocale from "date-fns/locale/pt-BR";
import { AppThemeProvider } from "./hooks/theme";

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <LoadingProvider>
      <ThemeProvider theme={mainTheme}>
        <BrowserRouter>
          <AuthProvider>
            <ToastProvider>
              <LocalizationProvider
                locale={brSaLocale}
                dateAdapter={AdapterDateFns}
              >
                <AppThemeProvider>
                  <App />
                </AppThemeProvider>
              </LocalizationProvider>
            </ToastProvider>
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </LoadingProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
