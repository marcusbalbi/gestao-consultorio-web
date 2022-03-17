import * as React from "react";
import { Page } from "../../shared";
import { yupResolver } from "@hookform/resolvers/yup";

import { CadsatrarProfissionalValidationSchema } from "./validationSchemas";
import { ProfissionalForm } from "./ProfissionalForm";
import { createProfissional } from "./ProfissionalService";
import { CadastrarProfissionalDto } from "./ProfissionalDto";

const ProfissionalCreate = () => {
  const onSubmit = (data: CadastrarProfissionalDto) => {
    createProfissional(data);
  };
  return (
    <Page>
      <ProfissionalForm
        resolver={yupResolver(CadsatrarProfissionalValidationSchema)}
        onSubmit={onSubmit}
      />
    </Page>
  );
};

export { ProfissionalCreate };
