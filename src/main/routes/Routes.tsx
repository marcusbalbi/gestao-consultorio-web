import * as React from "react";
import { Route, Routes } from "react-router-dom";
import { PacienteMain } from "../../features/paciente";
import { PacienteCreate } from "../../features/paciente/PacienteCreate";
import { ProfissionalMain } from "../../features/profissional";
import { ProfissionalCreate } from "../../features/profissional/ProfissionalCreate";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<div>ROTA 1</div>} />
      <Route path="/paciente" element={<PacienteMain />} />
      <Route path="/paciente/cadastrar" element={<PacienteCreate />} />
      <Route path="/profissional" element={<ProfissionalMain />} />
      <Route path="/profissional/cadastrar" element={<ProfissionalCreate />} />
    </Routes>
  );
};

export default AppRoutes;
