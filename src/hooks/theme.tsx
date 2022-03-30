import React, { createContext, useContext } from "react";

type Mode = "dark" | "light";

interface AppThemeContextProps {
  mode: "dark" | "light";
  changeMode(newTheme: Mode): void;
}

const AppThemeContext = createContext<AppThemeContextProps>({
  mode: "light",
} as AppThemeContextProps);

const AppThemeProvider = ({ children }: any) => {
  const [selectedMode, setSelectedMode] = React.useState<Mode>("light");

  const changeMode = (newTheme: Mode) => {
    setSelectedMode(newTheme);
  };

  return (
    <AppThemeContext.Provider
      value={{
        mode: selectedMode,
        changeMode,
      }}
    >
      {children}
    </AppThemeContext.Provider>
  );
};

function useAppTheme(): AppThemeContextProps {
  const context = useContext(AppThemeContext);

  if (!context) {
    throw new Error("useAppTHeme must be used within an AppThemeProvider");
  }

  return context;
}

export { AppThemeProvider, useAppTheme };
