import * as React from "react";
import { Page } from "../../shared";
import { yupResolver } from "@hookform/resolvers/yup";

import { AtualizarProfissionalValidationSchema } from "./validationSchemas";
import { ProfissionalForm } from "./ProfissionalForm";
import { useParams } from "react-router-dom";

const ProfissionalUpdate = () => {
  const params = useParams();
  return (
    <Page>
      <h2>Editando o {params.id}</h2>
      <ProfissionalForm
        updating
        resolver={yupResolver(AtualizarProfissionalValidationSchema)}
      />
    </Page>
  );
};

export { ProfissionalUpdate };
