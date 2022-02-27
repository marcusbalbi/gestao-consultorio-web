import {
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import * as React from "react";
import { Page } from "../../shared";
import { ActionBar } from "../../shared/ActionBar";

const PacienteCreate = () => {
  return (
    <Page>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">Informações Pessoais</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Nome Completo"
            placeholder="Ex: João Silva"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            type={"number"}
            fullWidth
            label="CPF"
            placeholder="00000000000"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Date de Nascimento"
            placeholder="00/00/0000"
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Endereço</Typography>
        </Grid>
        <Grid item xs={12} md={10}>
          <TextField fullWidth label="Logradouro" />
        </Grid>
        <Grid item xs={12} md={2}>
          <TextField fullWidth label="Número" />
        </Grid>
        <Grid item xs={12} md={2}>
          <TextField fullWidth label="CEP" />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField fullWidth label="Bairro" />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField fullWidth label="Cidade" />
        </Grid>
        <Grid item xs={12} md={2}>
          <TextField fullWidth label="Estado" />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth label="Complemento" />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Contato</Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField fullWidth label="Telefone Celular" />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField fullWidth label="Email" />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField fullWidth label="Telefone para Contato" />
        </Grid>
        <Grid item xs={12}>
          <ActionBar>
            <Button color="success">Cadastrar</Button>
            <Button color="error">Voltar</Button>
          </ActionBar>
        </Grid>
      </Grid>
    </Page>
  );
};

export { PacienteCreate };
