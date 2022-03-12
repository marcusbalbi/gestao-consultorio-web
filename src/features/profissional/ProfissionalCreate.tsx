import { Grid, TextField } from "@mui/material";
import * as React from "react";
import { BaseForm, Page } from "../../shared";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { CadastrarProfissionalDto } from "./ProfissionalDto";
import { CadsatrarProfissionalValidationSchema } from "./validationSchemas";
import { createProfissional } from "./ProfissionalService";

const ProfissionalCreate = () => {
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors, isDirty },
  } = useForm<CadastrarProfissionalDto>({
    resolver: yupResolver(CadsatrarProfissionalValidationSchema),
  });
  const onSubmit: SubmitHandler<CadastrarProfissionalDto> = (data) => {
    createProfissional(data);
  };
  return (
    <Page>
      <BaseForm isDirty={isDirty} onSubmit={handleSubmit(onSubmit)}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Nome Completo"
            placeholder="Ex: João Silva"
            error={!!errors.nome?.message}
            helperText={errors.nome?.message}
            {...register("nome")}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="CPF"
            placeholder="00000000000"
            error={!!errors.cpf?.message}
            helperText={errors.cpf?.message}
            {...register("cpf")}
          />
        </Grid>
      </BaseForm>
    </Page>
  );
};

export { ProfissionalCreate };
