import { Grid, TextField } from "@mui/material";
import * as React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BaseSearchForm, FormInfoSection } from "../../shared";
import { BuscarPacienteDto } from "./pacienteDto";

interface PacienteBuscaFormProps {
  onSubmit?: any;
}

const PacienteBuscaForm = (props: PacienteBuscaFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BuscarPacienteDto>();
  const onSubmit: SubmitHandler<BuscarPacienteDto> = (data) =>
    props.onSubmit && props.onSubmit(data);
  return (
    <BaseSearchForm onSubmit={handleSubmit(onSubmit)} onClean={() => reset()}>
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

export { PacienteBuscaForm };
