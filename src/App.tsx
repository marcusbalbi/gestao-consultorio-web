import React from "react";
import AppRoutes from "./main/routes/Routes";
import { TopBar } from "./main/top-bar";

function App() {
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
