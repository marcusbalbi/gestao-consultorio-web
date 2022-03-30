import { FormControlLabel, FormGroup, Switch, Typography } from "@mui/material";
import { useState } from "react";
import { useAppTheme } from "../../hooks/theme";
import { Page } from "../../shared";

const ConfigPage = () => {
  const { mode, changeMode } = useAppTheme();
  const [darkMode, setDarkmode] = useState(mode === "dark");

  return (
    <Page>
      <Typography variant="h4">Configurações Visuais</Typography>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={darkMode}
              onChange={(v) => {
                setDarkmode(v.target.checked);
                if (v.target.checked) {
                  changeMode("dark");
                } else {
                  changeMode("light");
                }
              }}
            />
          }
          label="Modo Escuro"
        />
      </FormGroup>
    </Page>
  );
};

export { ConfigPage };
