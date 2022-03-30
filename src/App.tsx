import { Box } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import React from "react";
import { mainTheme, darkTheme, visualImpairmentTheme } from "./config/themes";
import { useAppTheme } from "./hooks/theme";
import AppRoutes from "./main/routes/Routes";
import { TopBar } from "./main/top-bar";

const THEMES = {
  light: mainTheme,
  dark: darkTheme,
  visual: visualImpairmentTheme,
};

function App() {
  // const { signIn, signOut, dados } = useAuth();
  // useEffect(() => {
  //   if (!dados?.token) {
  //     signIn({
  //       username: process.env.REACT_APP_SAMPLE_USERNAME || "",
  //       password: process.env.REACT_APP_SAMPLE_PASSWORD || "",
  //     });
  //   }
  // }, [dados, signIn, signOut]);

  const { theme } = useAppTheme();

  return (
    <ThemeProvider theme={THEMES[theme || "light"]}>
      <React.Fragment>
        <Box
          sx={{
            backgroundColor: (theme) => theme.palette.background.default,
            minHeight: "100vh",
          }}
        >
          <TopBar />
          <AppRoutes />
        </Box>
      </React.Fragment>
    </ThemeProvider>
  );
}

export default App;
