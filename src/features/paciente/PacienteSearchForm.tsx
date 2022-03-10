import { Grid, TextField } from "@mui/material";
import * as React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BaseSearchForm, FormInfoSection } from "../../shared";
import { CadastrarPacienteDto } from "./pacienteDto";

const PacienteSearchForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CadastrarPacienteDto>();
  const onSubmit: SubmitHandler<CadastrarPacienteDto> = (data) =>
    console.log(data);
  return (
    <BaseSearchForm onSubmit={handleSubmit(onSubmit)}>
      <FormInfoSection>Buscar Paciente</FormInfoSection>
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
        {/* <TextField
          fullWidth
          label="Telefone Celular"
          error={!!errors.telefoneCelular?.message}
          helperText={errors.telefoneCelular?.message}
          {...register("telefoneCelular")}
        /> */}
      </Grid>
    </BaseSearchForm>
  );
};

export { PacienteSearchForm };
