import * as React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AgendamentoMain } from "../../features/agendamento";
import { AgendamentoCreate } from "../../features/agendamento/AgendamentoCreate";
import { ConfigPage } from "../../features/config";
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
      <Route
        path="/paciente"
        element={<Private element={<PacienteMain />} />}
      />
      <Route
        path="/paciente/cadastrar"
        element={<Private element={<PacienteCreate />} />}
      />
      <Route
        path="/paciente/alterar/:id"
        element={<Private element={<PacienteUpdate />} />}
      />
      <Route
        path="/profissional"
        element={<Private element={<ProfissionalMain />} />}
      />
      <Route
        path="/profissional/cadastrar"
        element={<Private element={<ProfissionalCreate />} />}
      />
      <Route
        path="/profissional/alterar/:id"
        element={<Private element={<ProfissionalUpdate />} />}
      />
      <Route
        path="/local-atendimento"
        element={<Private element={<MenAtWork />} />}
      />
      <Route path="/config" element={<Private element={<ConfigPage />} />} />
      <Route
        path="/agenda"
        element={<Private element={<AgendamentoMain />} />}
      />
      <Route
        path="/agenda/novo"
        element={<Private element={<AgendamentoCreate />} />}
      />
    </Routes>
  );
};

export default AppRoutes;
