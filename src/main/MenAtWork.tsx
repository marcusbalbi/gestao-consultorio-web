import { Handyman } from "@mui/icons-material";
import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { Page } from "../shared";

const MenAtWork = () => {
  const navigate = useNavigate();
  return (
    <Page title="Em Breve">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection={"column"}
      >
        <Handyman style={{ fontSize: "12rem" }} />
        <Button
          onClick={() => {
            navigate(-1);
          }}
        >
          Voltar
        </Button>
      </Box>
    </Page>
  );
};

export { MenAtWork };
