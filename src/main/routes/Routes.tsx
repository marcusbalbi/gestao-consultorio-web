import * as React from "react";
import { Route, Routes } from "react-router-dom";
import { PacienteMain } from "../../features/paciente";
import { PacienteCreate } from "../../features/paciente/PacienteCreate";
import { PacienteUpdate } from "../../features/paciente/PacienteUpdate";
import { ProfissionalMain } from "../../features/profissional";
import { ProfissionalCreate } from "../../features/profissional/ProfissionalCreate";
import { ProfissionalUpdate } from "../../features/profissional/ProfissionalUpdate";
import { MenAtWork } from "../MenAtWork";
import { Welcome } from "../Welcome";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/paciente" element={<PacienteMain />} />
      <Route path="/paciente/cadastrar" element={<PacienteCreate />} />
      <Route path="/paciente/alterar/:id" element={<PacienteUpdate />} />
      <Route path="/profissional" element={<ProfissionalMain />} />
      <Route path="/profissional/cadastrar" element={<ProfissionalCreate />} />
      <Route
        path="/profissional/alterar/:id"
        element={<ProfissionalUpdate />}
      />
      <Route path="/local-atendimento" element={<MenAtWork />} />
      <Route path="/config" element={<MenAtWork />} />
    </Routes>
  );
};

export default AppRoutes;
