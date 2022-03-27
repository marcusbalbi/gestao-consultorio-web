import * as React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AgendamentoMain } from "../../features/agendamento";
import { AgendamentoCreate } from "../../features/agendamento/AgendamentoCreate";
import LoginPage from "../../features/login/LoginPage";
import { PacienteMain } from "../../features/paciente";
import { PacienteCreate } from "../../features/paciente/PacienteCreate";
import { PacienteUpdate } from "../../features/paciente/PacienteUpdate";
import { ProfissionalMain } from "../../features/profissional";
import { ProfissionalCreate } from "../../features/profissional/ProfissionalCreate";
import { ProfissionalUpdate } from "../../features/profissional/ProfissionalUpdate";
import { useAuth } from "../../hooks/auth";
import { MenAtWork } from "../MenAtWork";
import { Welcome } from "../Welcome";

interface PrivateProps {
  element: JSX.Element;
}

const Private = ({ element }: PrivateProps) => {
  const { token } = useAuth();
  if (!token) {
    return <Navigate to={"/login"} />;
  }
  return element;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Private element={<Welcome />} />} />
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
      <Route path="/agenda" element={<AgendamentoMain />} />
      <Route path="/agenda/novo" element={<AgendamentoCreate />} />
    </Routes>
  );
};

export default AppRoutes;
