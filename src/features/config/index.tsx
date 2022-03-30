import { ThemeContext } from "@emotion/react";
import { Button } from "@mui/material";
import { useContext } from "react";
import { useAppTheme } from "../../hooks/theme";
import { Page } from "../../shared";

const ConfigPage = () => {
  const { changeTheme } = useAppTheme();

  return (
    <Page>
      <Button
        onClick={() => {
          changeTheme("light");
        }}
      >
        Normal
      </Button>
      <Button
        onClick={() => {
          changeTheme("dark");
        }}
      >
        Dark
      </Button>
      <Button
        onClick={() => {
          changeTheme("visual");
        }}
      >
        Fonte Maior
      </Button>
    </Page>
  );
};

export { ConfigPage };
