import * as React from "react";
import { Page } from "../../shared";
import { yupResolver } from "@hookform/resolvers/yup";

import { CadastrarPacienteDto } from "./pacienteDto";
import { CadastrarPacienteValdationSchema } from "./validationSchemas";
import { createPaciente } from "./pacienteService";
import { PacienteForm } from "./PacienteForm";

const PacienteCreate = () => {
  const onSubmit = (data: CadastrarPacienteDto) => {
    createPaciente(data);
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
