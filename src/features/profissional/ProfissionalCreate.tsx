import { Grid, TextField } from "@mui/material";
import * as React from "react";
import { BaseForm, Page } from "../../shared";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { CadastrarProfissionalDto } from "./ProfissionalDto";
import { CadsatrarProfissionalValidationSchema } from "./validationSchemas";
import { createProfissional } from "./ProfissionalService";
import { TipoProfissionalSelect2 } from "./TipoProfissionalSelect2";

const ProfissionalCreate = () => {
  const {
    register,
    handleSubmit,
    control,
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
        <Grid item xs={12} md={6}>
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
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            type={"password"}
            label="Senha"
            error={!!errors.senha?.message}
            helperText={errors.senha?.message}
            {...register("senha")}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TipoProfissionalSelect2
            name="tipo"
            control={control}
            fullWidth
            error={errors.tipo?.message ? true : false}
            helperText={errors.tipo?.message}
          />
        </Grid>
      </BaseForm>
    </Page>
  );
};

export { ProfissionalCreate };
