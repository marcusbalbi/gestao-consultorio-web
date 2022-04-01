import { Grid, TextField } from "@mui/material";
import * as React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BaseSearchForm, FormInfoSection } from "../../shared";
import { BuscarProfissionalDto } from "./ProfissionalDto";
import { TipoProfissionalSelect2 } from "./TipoProfissionalSelect2";

interface ProfissionalSearchFormProps {
  onSubmit?(data: BuscarProfissionalDto): any;
}

const ProfissionalSearchForm = (props: ProfissionalSearchFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    control,
    reset,
  } = useForm<BuscarProfissionalDto>();
  const onSubmit: SubmitHandler<BuscarProfissionalDto> = (data) =>
    props.onSubmit && props.onSubmit(data);
  return (
    <BaseSearchForm
      onSubmit={handleSubmit(onSubmit)}
      onClean={() => {
        setValue("tipoProfissional", undefined);
        reset();
        props.onSubmit && props.onSubmit(getValues());
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
        <TipoProfissionalSelect2
          name="tipoProfissional"
          control={control}
          fullWidth
        />
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
