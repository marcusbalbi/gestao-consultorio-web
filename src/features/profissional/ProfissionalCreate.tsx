import * as React from "react";
import { Page } from "../../shared";
import { yupResolver } from "@hookform/resolvers/yup";

import { CadsatrarProfissionalValidationSchema } from "./validationSchemas";
import { ProfissionalForm } from "./ProfissionalForm";

const ProfissionalCreate = () => {
  return (
    <Page>
      <ProfissionalForm
        resolver={yupResolver(CadsatrarProfissionalValidationSchema)}
      />
    </Page>
  );
};

export { ProfissionalCreate };
