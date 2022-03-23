import React, { useCallback, useContext, createContext } from "react";

import {
  SnackbarProvider,
  SnackbarProviderProps,
  useSnackbar,
  SnackbarKey,
  OptionsObject,
} from "notistack";

export interface ToastMessage {
  title: string;
  type?: "default" | "error" | "success" | "warning" | "info";
  options?: OptionsObject | undefined;
}

interface ToastContextData {
  addToast(data: ToastMessage): void;
  removeToast(id: string): void;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

const ToastProviderBuilder: React.FC = ({ children }) => {
  const snackbar = useSnackbar();

  const addToast = useCallback(
    ({ title, type, options }: ToastMessage): SnackbarKey => {
      return snackbar.enqueueSnackbar(title, {
        variant: type,
        ...options,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const removeToast = useCallback((key: string | undefined) => {
    return snackbar.closeSnackbar(key);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
};

const ToastProvider: React.FC = ({ children }) => {
  const defaultProps: SnackbarProviderProps = {
    autoHideDuration: 3000,
    maxSnack: 3,
    children,
    hideIconVariant: true,
    preventDuplicate: true,
    style: {
      paddingBottom: "0.5rem",
      paddingTop: "0.5rem",
    },
    anchorOrigin: {
      horizontal: "right",
      vertical: "bottom",
    },
  };

  return (
    <SnackbarProvider {...defaultProps}>
      <ToastProviderBuilder>{children}</ToastProviderBuilder>
    </SnackbarProvider>
  );
};
function useToast(): ToastContextData {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within an ToastProvider");
  }

  return context;
}

export { ToastProvider, useToast };
