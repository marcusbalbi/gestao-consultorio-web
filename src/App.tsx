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
          username: process.env.REACT_APP_SAMPLE_USERNAME,
          password: process.env.REACT_APP_SAMPLE_PASSWORD,
        })
        .then(({ data }) => {
          localStorage.setItem("login", JSON.stringify(data));
        });
    }
  }, []);
  return (
    <React.Fragment>
      <div>
        {JSON.stringify({
          username: process.env.REACT_APP_SAMPLE_USERNAME,
          password: process.env.REACT_APP_SAMPLE_PASSWORD,
          host: process.env.REACT_APP_BACKEND_URL,
        })}
      </div>
      <TopBar />
      <>
        <AppRoutes />
      </>
    </React.Fragment>
  );
}

export default App;
