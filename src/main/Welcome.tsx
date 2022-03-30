import { CircularProgress, Typography } from "@mui/material";
import { useAuth } from "../hooks/auth";
import { Page } from "../shared";

const Welcome = () => {
  const { dados } = useAuth();
  return (
    <Page>
      {dados ? (
        <Typography variant="h3">Bem vindo, {dados.usuario} !</Typography>
      ) : (
        <CircularProgress />
      )}
    </Page>
  );
};

export { Welcome };
