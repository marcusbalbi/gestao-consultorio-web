import { Handyman, Carpenter, SquareFoot } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { Page } from "../shared";

const MenAtWork = () => {
  const navigate = useNavigate();
  const renderConstructionIcon = () => {
    const components = [
      <Handyman style={{ fontSize: "12rem" }} />,
      <SquareFoot style={{ fontSize: "12rem" }} />,
      <Carpenter style={{ fontSize: "12rem" }} />,
    ];

    const ramdom = Math.floor(Math.random() * 2);

    return components[ramdom];
  };
  return (
    <Page title="Em Breve">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection={"column"}
      >
        {renderConstructionIcon()}
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
