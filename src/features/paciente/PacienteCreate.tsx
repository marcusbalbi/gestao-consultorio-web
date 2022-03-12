import { Grid, TextField } from "@mui/material";
import * as React from "react";
import { UFSelect, BaseForm, FormInfoSection, Page } from "../../shared";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { CadastrarPacienteDto } from "./pacienteDto";
import { CadastrarPacienteValdationSchema } from "./validationSchemas";
import { createPaciente } from "./pacienteService";

const PacienteCreate = () => {
  const {
    register,
    handleSubmit,
    // watch,
    setValue,
    formState: { errors, isDirty },
  } = useForm<CadastrarPacienteDto>({
    resolver: yupResolver(CadastrarPacienteValdationSchema),
  });
  const onSubmit: SubmitHandler<CadastrarPacienteDto> = (data) => {
    console.log(data);
    createPaciente(data)
  }
  return (
    <Page>
      <BaseForm isDirty={isDirty} onSubmit={handleSubmit(onSubmit)}>
        <FormInfoSection>Informações Pessoais</FormInfoSection>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Nome Completo"
            placeholder="Ex: João Silva"
            error={!!errors.nome?.message}
            helperText={errors.nome?.message}
            {...register("nome")}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="CPF"
            placeholder="00000000000"
            error={!!errors.cpf?.message}
            helperText={errors.cpf?.message}
            {...register("cpf")}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Date de Nascimento"
            placeholder="00/00/0000"
            error={!!errors.dataNascimento?.message}
            helperText={errors.dataNascimento?.message}
            {...register("dataNascimento")}
          />
        </Grid>
        <FormInfoSection>Endereço</FormInfoSection>
        <Grid item xs={12} md={10}>
          <TextField fullWidth label="Logradouro" {...register("logradouro")} />
        </Grid>
        <Grid item xs={12} md={2}>
          <TextField fullWidth label="Número" {...register("numero")} />
        </Grid>
        <Grid item xs={12} md={2}>
          <TextField
            fullWidth
            label="CEP"
            error={!!errors.cep?.message}
            helperText={errors.cep?.message}
            {...register("cep")}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField fullWidth label="Bairro" {...register("bairro")} />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField fullWidth label="Cidade" {...register("cidade")} />
        </Grid>
        <Grid item xs={12} md={2}>
          <UFSelect
            label="UF"
            fullWidth
            {...register("estado")}
            onChange={(e) => {
              setValue("estado", e.target.value as string);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Complemento"
            {...register("complemento")}
          />
        </Grid>
        <FormInfoSection>Contato</FormInfoSection>
        <Grid item xs={12} md={1}>
          <TextField
            fullWidth
            label="DDD"
            error={!!errors.telefone?.ddd?.message}
            helperText={errors.telefone?.ddd?.message}
            {...register("telefone.ddd")}
          />
        </Grid>
        <Grid item xs={12} md={5}>
          <TextField
            fullWidth
            label="Telefone"
            error={!!errors.telefone?.telefone?.message}
            helperText={errors.telefone?.telefone?.message}
            {...register("telefone.telefone")}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Email"
            error={!!errors.email?.message}
            helperText={errors.email?.message}
            {...register("email")}
          />
        </Grid>
      </BaseForm>
    </Page>
  );
};

export { PacienteCreate };
