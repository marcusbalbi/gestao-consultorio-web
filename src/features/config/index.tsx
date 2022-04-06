import { FormControlLabel, FormGroup, Switch, Typography } from "@mui/material";
import { useState } from "react";
import { useAppTheme } from "../../hooks/theme";
import { Page } from "../../shared";

const ConfigPage = () => {
  const { mode, changeMode } = useAppTheme();
  const [visualMode, setVisualMode] = useState(mode === "visual");

  return (
    <Page>
      <Typography variant="h4">Configurações Visuais</Typography>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={visualMode}
              onChange={(v) => {
                setVisualMode(v.target.checked);
                if (v.target.checked) {
                  changeMode("visual");
                } else {
                  changeMode("regular");
                }
              }}
            />
          }
          label="Aumentar Letras"
        />
      </FormGroup>
    </Page>
  );
};

export { ConfigPage };
