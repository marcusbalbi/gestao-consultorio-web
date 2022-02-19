import { Paper } from "@mui/material";
import React from "react";
import AppRoutes from "./main/routes/Routes";
import { TopBar } from "./main/top-bar";

function App() {
  return (
    <React.Fragment>
      <TopBar />
      <Paper sx={{ padding: 2, margin: 4 }}>
        <AppRoutes />
      </Paper>
    </React.Fragment>
  );
}

export default App;
