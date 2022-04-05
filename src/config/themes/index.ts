import { createTheme } from "@mui/material/styles";
import { ptBR } from "@mui/x-data-grid";

const mainTheme = createTheme(
  {
    palette: {
      background: {
        paper: "#FFF",
        default: "#F2F2FA",
      },
    },
  },
  ptBR
);

const darkTheme = createTheme(
  {
    palette: {
      mode: "dark",
    },
  },
  ptBR
);

const visualImpairmentTheme = createTheme(
  {
    palette: {
      background: {
        paper: "#FFF",
        default: "#F2F2FA",
      },
    },
    typography: {
      fontSize: 25,
    },
  },
  ptBR
);

export { mainTheme, darkTheme, visualImpairmentTheme };
