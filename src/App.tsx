import React, { useEffect } from "react";
import AppRoutes from "./main/routes/Routes";
import { TopBar } from "./main/top-bar";
import { request } from "./shared";

function App() {
  useEffect(() => {
    const login = localStorage.getItem("login");
    if (!login) {
      request
        .post("/auth/signin", {
          username: "01234567890",
          password: "123456",
        })
        .then(({ data }) => {
          localStorage.setItem("login", JSON.stringify(data));
        });
    }
  }, []);
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
