import * as React from "react";
import { Page } from "../../shared";
import { yupResolver } from "@hookform/resolvers/yup";

import { AtualizarProfissionalValidationSchema } from "./validationSchemas";
import { PacienteForm } from "./PacienteForm";
import { useParams } from "react-router-dom";

const PacienteUpdate = () => {
  const params = useParams();
  return (
    <Page>
      <h2>Editando o {params.id}</h2>
      <PacienteForm
        updating
        resolver={yupResolver(AtualizarProfissionalValidationSchema)}
      />
    </Page>
  );
};

export { PacienteUpdate };
