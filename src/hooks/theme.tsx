import React, { createContext, useContext } from "react";

type Mode = "visual" | "regular";

interface AppThemeContextProps {
  mode: "visual" | "regular";
  changeMode(newTheme: Mode): void;
}

const AppThemeContext = createContext<AppThemeContextProps>({
  mode: "regular",
} as AppThemeContextProps);

const AppThemeProvider = ({ children }: any) => {
  const [selectedMode, setSelectedMode] = React.useState<Mode>("regular");

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
