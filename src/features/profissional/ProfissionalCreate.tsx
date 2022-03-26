import * as React from "react";
import { Page } from "../../shared";
import { yupResolver } from "@hookform/resolvers/yup";

import { CadsatrarProfissionalValidationSchema } from "./validationSchemas";
import { ProfissionalForm } from "./ProfissionalForm";
import { createProfissional } from "./ProfissionalService";
import { CadastrarProfissionalDto } from "./ProfissionalDto";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../hooks/toast";

const ProfissionalCreate = () => {
    const navigate = useNavigate();
    const { addToast } = useToast();
    const onSubmit = async (data: CadastrarProfissionalDto) => {
      try {
        const result = await createProfissional(data);
        if (result) {
          addToast({
            title: "Criado com sucesso!",
            type: "success",
          });
          navigate("/profissional");
        }
      } catch (err: any) {
        addToast({
          title: err.message,
          type: "error",
        });
      }
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
