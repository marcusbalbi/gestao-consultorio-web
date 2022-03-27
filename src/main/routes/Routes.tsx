import * as React from "react";
import { Route, Routes } from "react-router-dom";
import { AgendamentoMain } from "../../features/agendamento";
import { AgendamentoCreate } from "../../features/agendamento/AgendamentoCreate";
import { PacienteMain } from "../../features/paciente";
import { PacienteNovo } from "../../features/paciente/PacienteNovo";
import { PacienteAlterar } from "../../features/paciente/PacienteAlterar";
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
      <Route path="/paciente/cadastrar" element={<PacienteNovo />} />
      <Route path="/paciente/alterar/:id" element={<PacienteAlterar />} />
      <Route path="/profissional" element={<ProfissionalMain />} />
      <Route path="/profissional/cadastrar" element={<ProfissionalCreate />} />
      <Route
        path="/profissional/alterar/:id"
        element={<ProfissionalUpdate />}
      />
      <Route path="/local-atendimento" element={<MenAtWork />} />
      <Route path="/config" element={<MenAtWork />} />
      <Route path="/agenda" element={<AgendamentoMain />} />
      <Route path="/agenda/novo" element={<AgendamentoCreate />} />
    </Routes>
  );
};

export default AppRoutes;
