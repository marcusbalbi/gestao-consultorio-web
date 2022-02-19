import * as React from "react";
import { Route, Routes } from "react-router-dom";
import { PacienteMain } from "../../features/paciente";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<div>ROTA 1</div>} />
      <Route path="/paciente" element={<PacienteMain />} />
    </Routes>
  );
};

export default AppRoutes;
