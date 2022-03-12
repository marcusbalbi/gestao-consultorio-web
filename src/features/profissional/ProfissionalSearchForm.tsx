import { Grid, TextField } from "@mui/material";
import * as React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BaseSearchForm, FormInfoSection } from "../../shared";
import { TipoProfissionalSelect } from "../../shared/TipoProfissionalSelect";
import { BuscarProfissionalDto } from "./ProfissionalDto";

const ProfissionalSearchForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    reset,
  } = useForm<BuscarProfissionalDto>();
  const onSubmit: SubmitHandler<BuscarProfissionalDto> = (data) =>
    console.log(data);
  return (
    <BaseSearchForm
      onSubmit={handleSubmit(onSubmit)}
      onClean={() => {
        reset();
      }}
    >
      <FormInfoSection>Buscar Profissionais</FormInfoSection>
      {JSON.stringify(getValues())}
      <button
        onClick={() => {
          setValue("tipo", 2);
        }}
      >
        CLICA AQUI MUDA SELECT
      </button>
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
      <Grid item xs={12}>
        <TipoProfissionalSelect
          clean={(ref: any) => {
            ref.value = undefined;
          }}
          fullWidth
          {...register("tipo")}
          label="Tipo de Profissional"
        />
      </Grid>
    </BaseSearchForm>
  );
};

export { ProfissionalSearchForm };
