import * as React from "react";
import { Route, Routes } from "react-router-dom";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<div>ROTA 1</div>} />
      <Route path="about" element={<div>ROTA 2</div>} />
    </Routes>
  );
};

export default AppRoutes;
