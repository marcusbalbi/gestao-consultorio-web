import * as React from "react";
import { Route, Routes } from "react-router-dom";
import { PacienteMain } from "../../features/paciente";
import { PacienteCreate } from "../../features/paciente/PacienteCreate";
import { ProfissionalMain } from "../../features/profissional";
import { ProfissionalCreate } from "../../features/profissional/ProfissionalCreate";
import { ProfissionalUpdate } from "../../features/profissional/ProfissionalUpdate";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<div>ROTA 1</div>} />
      <Route path="/paciente" element={<PacienteMain />} />
      <Route path="/paciente/cadastrar" element={<PacienteCreate />} />
      <Route path="/profissional" element={<ProfissionalMain />} />
      <Route path="/profissional/cadastrar" element={<ProfissionalCreate />} />
      <Route path="/profissional/alterar/:id" element={<ProfissionalUpdate/>} />
    </Routes>
  );
};

export default AppRoutes;
