import { Grid, TextField } from "@mui/material";
import * as React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BaseSearchForm, FormInfoSection } from "../../shared";
import { BuscarAgendamentoDto } from "./agendamentoDto";

interface AgendamentoSearchFormProps {
  onSubmit?: any;
}

const AgendamentoSearchForm = (props: AgendamentoSearchFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BuscarAgendamentoDto>();
  const onSubmit: SubmitHandler<BuscarAgendamentoDto> = (data) =>
    props.onSubmit && props.onSubmit(data);
  return (
    <BaseSearchForm onSubmit={handleSubmit(onSubmit)} onClean={() => reset()}>
      <FormInfoSection>Buscar Agendamentos</FormInfoSection>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Nome do Paciente"
          placeholder="Ex: João Silva"
          {...register("nomePaciente")}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="CPF do Paciente"
          placeholder="00000000000"
          error={!!errors.cpfPaciente?.message}
          helperText={errors.cpfPaciente?.message}
          {...register("cpfPaciente")}
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

export { AgendamentoSearchForm };
