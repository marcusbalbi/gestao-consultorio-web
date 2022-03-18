import React, { createContext, useCallback, useState, useContext } from "react";

import { request } from "../shared/request";

interface AuthState {
  token: string;
  dados: UserData;
}

export interface User {
  id: string;
  name: string;
  username: string;
}

interface UserData {
  user: User;
  token: string;
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
  updateUserData(dados: User): void;
  dados: UserData;
  token: string;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem("@gestao-consultorio-web:token");
    const dados = localStorage.getItem("@gestao-consultorio-web:dados");

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

    localStorage.setItem("@gestao-consultorio-web:token", dados.token);
    localStorage.setItem(
      "@gestao-consultorio-web:dados",
      JSON.stringify(dados)
    );

    // Set default token access
    request.defaults.headers.common["Authorization"] = `Bearer ${dados.token}`;

    setData({ token: dados.token, dados });
  }, []);

  const updateUserData = (user: User): void => {
    const novosDados = Object.assign({}, data, { user });
    localStorage.setItem(
      "@gestao-consultorio-web:dados",
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
      localStorage.getItem("@sombank:dados") || "{}"
    ) as UserData;
    localStorage.setItem("@sombank:last_login", dados?.user.username);
    localStorage.removeItem("@sombank:token");
    localStorage.removeItem("@sombank:dados");

    setData({} as AuthState);
  }, []);

  const getLastLogin = (): string => {
    return localStorage.getItem("@gestao-consultorio-web:last_login") || "";
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
