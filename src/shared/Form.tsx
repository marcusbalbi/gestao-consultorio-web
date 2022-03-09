import { Button, Grid } from "@mui/material";
import * as React from "react";

import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useTheme, Typography } from "@material-ui/core";
import { ActionBar } from ".";

interface CreateFormProps {
  children?: any;
  onSubmit?: any;
  isDirty?: boolean;
}
interface FormInfoSectionProps {
  children?: any;
}

interface SearchFormProps {
  children?: any;
  onSubmit?: any;
  isDirty?: boolean;
}

const FormInfoSection = (props: FormInfoSectionProps) => {
  return (
    <Grid item xs={12}>
      <Typography variant="h6">{props.children}</Typography>
    </Grid>
  );
};

const BaseForm = (props: CreateFormProps) => {
  const navigate = useNavigate();
  const theme = useTheme();
  return (
    <form onSubmit={props.onSubmit}>
      <Grid container spacing={2}>
        {props.children}
        <Grid item xs={12}>
          <ActionBar>
            <Button type="submit" color="success">
              Cadastrar
            </Button>
            <Button
              onClick={() => {
                if (props.isDirty) {
                  Swal.fire({
                    title: "Tem certeza?",
                    text: "você pode perder informações!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: theme.palette.error.dark,
                    cancelButtonColor: theme.palette.primary.main,
                    confirmButtonText: "Sair",
                    cancelButtonText: "Continuar",
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
  );
};

const BaseSearchForm = (props: SearchFormProps) => {
  const theme = useTheme();
  return (
    <form onSubmit={props.onSubmit}>
      <Grid container spacing={2}>
        {props.children}
        <Grid item xs={12}>
          <ActionBar>
            <Button type="submit" color="success">
              Buscar
            </Button>
            <Button color="error">Limpar</Button>
          </ActionBar>
        </Grid>
      </Grid>
    </form>
  );
};

export { BaseForm, FormInfoSection, BaseSearchForm };
