import { Grid, TextField } from "@mui/material";
import * as React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BaseSearchForm, FormInfoSection } from "../../shared";
import { BuscarProfissionalDto } from "./ProfissionalDto";
import { TipoProfissionalSelect2 } from "./TipoProfissionalSelect2";

const ProfissionalSearchForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
    reset,
  } = useForm<BuscarProfissionalDto>();
  const onSubmit: SubmitHandler<BuscarProfissionalDto> = (data) =>
    console.log(data);
  return (
    <BaseSearchForm
      onSubmit={handleSubmit(onSubmit)}
      onClean={() => {
        setValue("tipo", undefined);
        reset();
      }}
    >
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
      <Grid item xs={12}>
        <TipoProfissionalSelect2 name="tipo" control={control} fullWidth />
        {/* <TipoProfissionalSelect
          fullWidth
          {...register("tipo")}
          label="Tipo de Profissional"
        /> */}
      </Grid>
    </BaseSearchForm>
  );
};

export { ProfissionalSearchForm };
