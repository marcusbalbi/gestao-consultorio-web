import * as React from "react";
import { Route, Routes } from "react-router-dom";
import { PacienteMain } from "../../features/paciente";
import { PacienteCreate } from "../../features/paciente/PacienteCreate";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<div>ROTA 1</div>} />
      <Route path="/paciente" element={<PacienteMain />} />
      <Route path="/paciente/cadastrar" element={<PacienteCreate />} />
    </Routes>
  );
};

export default AppRoutes;
