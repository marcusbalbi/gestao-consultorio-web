import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import { useNavigate } from "react-router-dom";
import { SignInCredentials, useAuth } from "../../hooks/auth";
import { useToast } from "../../hooks/toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginValidation } from "./validationScheme";
import { Paper } from "@mui/material";
import { LoadingButton } from "@material-ui/lab";

const LoginPage = () => {
  const { signIn, getLastLogin, token } = useAuth();
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<SignInCredentials>({
    resolver: yupResolver(loginValidation),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  useEffect(() => {
    if (token) {
      navigate("/");
    }
    const login = getLastLogin();
    if (login) {
      setValue("username", login);
    }
  }, [token, navigate, getLastLogin, setValue]);

  async function onSubmit(data: SignInCredentials): Promise<void> {
    setLoading(true);
    try {
      await signIn(data);

      // Initial dashboard page
      navigate("/");
    } catch (error: any) {
      setLoading(false);
      if (error.response.status === 401) {
        addToast({
          type: "error",
          title: "Login ou senha incorretos!",
        });
        return;
      }

      // Precisariamos de algum tipo de error customizável do backend quando for da aplicação e não status 500
      console.log("LOGIN_ERROR", error);
      addToast({
        title: "Falha ao realizar o Login: " + error.response.data.message,
        type: "error",
      });
    }
  }

  return (
    <Container style={{ paddingTop: "10vh" }} component="main" maxWidth="xs">
      <Paper
        elevation={5}
        sx={{
          padding: (theme) => theme.spacing(3),
        }}
      >
        <Typography component="h1" variant="h5" color="primary">
          Faça seu login abaixo
        </Typography>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            {...register("username")}
            error={!!errors.username}
            helperText={errors.username?.message}
            margin="normal"
            id="email"
            label="CPF"
            autoFocus
          />
          <TextField
            fullWidth
            {...register("password")}
            type="password"
            error={!!errors.password}
            helperText={errors.password?.message}
            margin="normal"
            label="Senha"
          />
          <LoadingButton
            loading={loading}
            type="submit"
            fullWidth
            size="large"
            variant="contained"
            color="primary"
          >
            Fazer login
          </LoadingButton>
        </form>
        <Box>
          <Typography
            sx={{ mt: (theme) => theme.spacing(1) }}
            variant="body2"
            color="textSecondary"
            align="center"
          >
            Versão 0.0.1
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;
