import { Grid, TextField } from "@mui/material";
import * as React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BaseSearchForm, FormInfoSection } from "../../shared";
import { CadastrarProfissionalDto } from "./ProfissionalDto";

const ProfissionalSearchForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CadastrarProfissionalDto>();
  const onSubmit: SubmitHandler<CadastrarProfissionalDto> = (data) =>
    console.log(data);
  return (
    <BaseSearchForm onSubmit={handleSubmit(onSubmit)} onClean={() => reset()}>
      <FormInfoSection>Buscar Profissionais</FormInfoSection>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Nome"
          placeholder="Ex: João Silva"
          {...register("nome")}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="CPF"
          placeholder="00000000000"
          error={!!errors.cpf?.message}
          helperText={errors.cpf?.message}
          {...register("cpf")}
        />
      </Grid>
    </BaseSearchForm>
  );
};

export { ProfissionalSearchForm };
