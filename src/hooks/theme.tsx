import React, { createContext, useContext } from "react";

type ThemeType = "light" | "dark" | "visual";

interface AppThemeContextProps {
  theme: ThemeType;
  changeTheme(newTheme: ThemeType): void;
}

const AppThemeContext = createContext<AppThemeContextProps>({
  theme: "light",
} as AppThemeContextProps);

const AppThemeProvider = ({ children }: any) => {
  const [selectedTheme, setSelectedTheme] = React.useState<ThemeType>("light");

  const changeTheme = (newTheme: ThemeType) => {
    console.log("aqui cheguei!", newTheme);
    setSelectedTheme(newTheme);
  };

  return (
    <AppThemeContext.Provider
      value={{
        theme: selectedTheme,
        changeTheme,
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
