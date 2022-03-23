import * as React from "react";
import { Page } from "../../shared";
import { yupResolver } from "@hookform/resolvers/yup";

import { CadastrarPacienteDto } from "./pacienteDto";
import { CadastrarPacienteValdationSchema } from "./validationSchemas";
import { createPaciente } from "./pacienteService";
import { PacienteForm } from "./PacienteForm";
import { useNavigate } from "react-router-dom";

const PacienteCreate = () => {
  const navigate = useNavigate();
  const onSubmit = async (data: CadastrarPacienteDto) => {
    try {
      const result = await createPaciente(data);
      if (result) {
        navigate("/paciente");
      }
    } catch (err) {
      alert(err);
    }
  };
  return (
    <Page>
      <PacienteForm
        resolver={yupResolver(CadastrarPacienteValdationSchema)}
        onSubmit={onSubmit}
      />
    </Page>
  );
};

export { PacienteCreate };
