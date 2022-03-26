import { Grid } from "@mui/material";
import * as React from "react";
import { BaseForm, FormInfoSection } from "../../shared";
import { useForm, SubmitHandler } from "react-hook-form";

import { AgendarDto } from "./agendamentoDto";

interface AgendamentoFormProps {
  resolver: any;
  onSubmit?: any;
  data?: any;
}

const AgendamentoForm = (props: AgendamentoFormProps) => {
  const {
    handleSubmit,
    setValue,
    formState: { isDirty },
  } = useForm<AgendarDto>({
    resolver: props.resolver,
  });
  const onSubmit: SubmitHandler<AgendarDto> = (data) => {
    props.onSubmit(data);
  };

  React.useEffect(() => {
    if (!props.data) {
      return;
    }
  }, [props.data, setValue]);

  return (
    <BaseForm
      actionText="Agendar"
      isDirty={isDirty}
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormInfoSection>Informações Pessoais</FormInfoSection>
      <Grid item xs={12}>
        {/* <TextField
          fullWidth
          label="Nome Completo"
          placeholder="Ex: João Silva"
          error={!!errors.nome?.message}
          helperText={errors.nome?.message}
          {...register("nome")}
        /> */}
      </Grid>
    </BaseForm>
  );
};

export { AgendamentoForm };
