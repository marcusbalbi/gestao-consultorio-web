import React, { createContext, useCallback, useState, useContext } from "react";

import { request } from "../shared/request";

interface AuthState {
  token: string;
  dados: UserData;
}

interface UserData {
  usuario: string;
  token: string;
  perfis: Array<String>;
}

export interface SignInCredentials {
  username: string;
  password: string;
}

interface AuthContextData {
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  getLastLogin(): string;
  getUserWithToken(token: string): Promise<void>;
  updateUserData(dados: UserData): void;
  dados: UserData;
  token: string;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const storagePrefix = "@gestao-consultorio-web";

const buildStorageNamespace = (key: string): string =>
  `${storagePrefix}:${key}`;

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem(buildStorageNamespace("token"));
    const dados = localStorage.getItem(buildStorageNamespace("dados"));

    request.interceptors.response.use(undefined, (err) => {
      if (err.response.status === 401) {
        signOut();
      }
    });

    if (token && dados) {
      const dadosParse = JSON.parse(dados);

      request.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${dadosParse.token}`;

      return { token, dados: dadosParse };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ username, password }) => {
    const response = await request.post("/auth/signin", {
      username,
      password,
    });

    const dados = response.data;

    localStorage.setItem(buildStorageNamespace("token"), dados.token);
    localStorage.setItem(buildStorageNamespace("dados"), JSON.stringify(dados));

    // Set default token access
    request.defaults.headers.common["Authorization"] = `Bearer ${dados.token}`;

    setData({ token: dados.token, dados });
  }, []);

  const updateUserData = (userData: UserData): void => {
    const novosDados = Object.assign({}, data, userData);
    localStorage.setItem(
      buildStorageNamespace("dados"),
      JSON.stringify(novosDados)
    );
    setData({
      token: data.token,
      dados: novosDados,
    });
  };

  const getUserWithToken = useCallback(async (token) => {
    request.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }, []);

  const signOut = useCallback(() => {
    const dados = JSON.parse(
      localStorage.getItem(buildStorageNamespace("dados")) || "{}"
    ) as UserData;
    localStorage.setItem(buildStorageNamespace("last_login"), dados?.usuario);
    localStorage.removeItem(`${storagePrefix}:token`);
    localStorage.removeItem(buildStorageNamespace("dados"));

    setData({} as AuthState);
  }, []);

  const getLastLogin = (): string => {
    return localStorage.getItem(buildStorageNamespace("last_login")) || "";
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        getLastLogin,
        getUserWithToken,
        updateUserData,
        dados: data.dados,
        token: data.token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export { AuthProvider, useAuth };
