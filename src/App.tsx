import React, { useEffect } from "react";
import { useAuth } from "./hooks/auth";
import AppRoutes from "./main/routes/Routes";
import { TopBar } from "./main/top-bar";
import { request } from "./shared";

function App() {
  const { signIn, signOut, dados } = useAuth();
  useEffect(() => {
    request.interceptors.response.use(undefined, (err) => {
      if (err.response.status === 401) {
        signOut();
      }
    });
    if (!dados?.token) {
      signIn({
        username: process.env.REACT_APP_SAMPLE_USERNAME || "",
        password: process.env.REACT_APP_SAMPLE_PASSWORD || "",
      });
    }
  }, [dados, signIn, signOut]);

  return (
    <React.Fragment>
      <TopBar />
      <>
        <AppRoutes />
      </>
    </React.Fragment>
  );
}

export default App;
