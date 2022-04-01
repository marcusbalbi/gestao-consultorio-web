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

interface AgendamentoSearchFormProps {
  onSubmit?: any;
}

const AgendamentoSearchForm = (props: AgendamentoSearchFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    reset,
  } = useForm<BuscarAgendamentoDto>({
    defaultValues: { proximas: true },
  });
  const onSubmit: SubmitHandler<BuscarAgendamentoDto> = (data) =>
    props.onSubmit && props.onSubmit(data);
  return (
    <BaseSearchForm
      onSubmit={handleSubmit(onSubmit)}
      onClean={() => {
        reset({ proximas: true });
        props.onSubmit && props.onSubmit(getValues());
      }}
    >
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

export { AgendamentoSearchForm };
