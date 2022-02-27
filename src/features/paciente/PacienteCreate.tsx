import { Button, Grid, TextField, Typography } from "@mui/material";
import * as React from "react";
import { Page, ActionBar } from "../../shared";
import { useForm, SubmitHandler } from "react-hook-form";
import { CadastrarPacienteDto } from "./pacienteDto";

const PacienteCreate = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CadastrarPacienteDto>();
  const onSubmit: SubmitHandler<CadastrarPacienteDto> = (data) =>
    console.log(data);
  return (
    <Page>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">Informações Pessoais</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nome Completo"
              placeholder="Ex: João Silva"
              {...register("nome")}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              type={"number"}
              fullWidth
              label="CPF"
              placeholder="00000000000"
              {...register("cpf")}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Date de Nascimento"
              placeholder="00/00/0000"
              {...register("dataNasciemnto")}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Endereço</Typography>
          </Grid>
          <Grid item xs={12} md={10}>
            <TextField
              fullWidth
              label="Logradouro"
              {...register("logradouro")}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField fullWidth label="Número" {...register("numero")} />
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField fullWidth label="CEP" {...register("cep")} />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField fullWidth label="Bairro" {...register("bairro")} />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField fullWidth label="Cidade" {...register("cidade")} />
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField fullWidth label="Estado" {...register("estado")} />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Complemento"
              {...register("complemento")}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Contato</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Telefone Celular"
              {...register("telefoneCelular")}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField fullWidth label="Email" {...register("email")} />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Telefone para Contato"
              {...register("telefoneContato")}
            />
          </Grid>
          <Grid item xs={12}>
            <ActionBar>
              <Button type="submit" color="success">
                Cadastrar
              </Button>
              <Button color="error">Voltar</Button>
            </ActionBar>
          </Grid>
        </Grid>
      </form>
    </Page>
  );
};

export { PacienteCreate };
