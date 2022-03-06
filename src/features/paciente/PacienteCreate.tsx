import { Button, Grid, TextField, Typography } from "@mui/material";
import * as React from "react";
import { Page, ActionBar, UFSelect } from "../../shared";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { CadastrarPacienteDto } from "./pacienteDto";
import { CadastrarPacienteValdationSchema } from "./validationSchemas";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useTheme } from "@material-ui/core";

const PacienteCreate = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const {
    register,
    handleSubmit,
    // watch,
    setValue,
    formState: { errors, isDirty },
  } = useForm<CadastrarPacienteDto>({
    resolver: yupResolver(CadastrarPacienteValdationSchema),
  });
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
              error={!!errors.dataNasciemnto?.message}
              helperText={errors.dataNasciemnto?.message}
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
          <Grid item xs={12}>
            <Typography variant="h6">Contato</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Telefone Celular"
              error={!!errors.telefoneCelular?.message}
              helperText={errors.telefoneCelular?.message}
              {...register("telefoneCelular")}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Email"
              error={!!errors.email?.message}
              helperText={errors.email?.message}
              {...register("email")}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              error={!!errors.telefoneContato?.message}
              helperText={errors.telefoneContato?.message}
              label="Telefone para Contato"
              {...register("telefoneContato")}
            />
          </Grid>
          <Grid item xs={12}>
            <ActionBar>
              <Button type="submit" color="success">
                Cadastrar
              </Button>
              <Button
                onClick={() => {
                  if (isDirty) {
                    Swal.fire({
                      title: "Tem certeza?",
                      text: "você pode perder informações!",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: theme.palette.error.dark,
                      cancelButtonColor: theme.palette.primary.main,
                      confirmButtonText: "Sair",
                      cancelButtonText: "continuar editando",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        navigate(-1);
                      }
                    });
                  } else {
                    navigate(-1);
                  }
                }}
                color="error"
              >
                Voltar
              </Button>
            </ActionBar>
          </Grid>
        </Grid>
      </form>
    </Page>
  );
};

export { PacienteCreate };
