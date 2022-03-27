import * as React from "react";
import { Route, Routes } from "react-router-dom";
import { AgendamentoMain } from "../../features/agendamento";
import { AgendamentoNovo } from "../../features/agendamento/AgendamentoNovo";
import { PacienteMain } from "../../features/paciente";
import { PacienteNovo } from "../../features/paciente/PacienteNovo";
import { PacienteAlterar } from "../../features/paciente/PacienteAlterar";
import { ProfissionalMain } from "../../features/profissional";
import { ProfissionalNovo } from "../../features/profissional/ProfissionalNovo";
import { ProfissionalAlterar } from "../../features/profissional/ProfissionalAlterar";
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
      <Route path="/profissional/cadastrar" element={<ProfissionalNovo />} />
      <Route
        path="/profissional/alterar/:id"
        element={<ProfissionalAlterar />}
      />
      <Route path="/local-atendimento" element={<MenAtWork />} />
      <Route path="/config" element={<MenAtWork />} />
      <Route path="/agenda" element={<AgendamentoMain />} />
      <Route path="/agenda/novo" element={<AgendamentoNovo />} />
    </Routes>
  );
};

export default AppRoutes;
