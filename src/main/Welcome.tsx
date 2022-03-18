import { Typography } from "@mui/material";
import { useAuth } from "../hooks/auth";
import { Page } from "../shared";

const Welcome = () => {
  const { dados } = useAuth();
  console.log(dados);
  return (
    <Page>
      <Typography variant="h3">Bem vindo, {dados.usuario} !</Typography>
    </Page>
  );
};

export { Welcome };
