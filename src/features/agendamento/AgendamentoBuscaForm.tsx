import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  TextField,
} from "@mui/material";
import * as React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BaseSearchForm, FormInfoSection } from "../../shared";
import { BuscarAgendamentoDto } from "./agendamentoDto";

interface AgendamentoBuscaFormProps {
  onSubmit?: any;
}

const AgendamentoBuscaForm = (props: AgendamentoBuscaFormProps) => {
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
          {...register("nome")}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="CPF do Paciente"
          placeholder="00000000000"
          error={!!errors.cpf?.message}
          helperText={errors.cpf?.message}
          {...register("cpf")}
        />
      </Grid>
      <Grid item xs={12}>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Apenas Futuro"
            {...register("proximas")}
          />
        </FormGroup>
      </Grid>
    </BaseSearchForm>
  );
};

export { AgendamentoBuscaForm };
