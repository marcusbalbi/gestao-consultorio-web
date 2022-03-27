import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import { useNavigate } from "react-router-dom";
import { SignInCredentials, useAuth } from "../../hooks/auth";
import { useToast } from "../../hooks/toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginValidation } from "./validationScheme";

const LoginPage = () => {
  const { signIn, getLastLogin, token } = useAuth();
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
    try {
      await signIn(data);

      // Initial dashboard page
      navigate("/");
    } catch (error: any) {
      if (error) {
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
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          mt: "10rem",
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
          <Button
            type="submit"
            fullWidth
            size="large"
            variant="contained"
            color="primary"
          >
            Fazer login
          </Button>
        </form>
      </Box>
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
    </Container>
  );
};

export default LoginPage;
