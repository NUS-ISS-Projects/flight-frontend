"use client";

import React, { createContext, useEffect, useReducer, ReactNode } from "react";

// third-party
import { jwtDecode } from "jwt-decode";

// reducer - state management
import { LOGIN, LOGOUT } from "@/store/actions";
import accountReducer from "@/store/accountReducer";

// project imports
import axios from "@/utils/axios";

// types
import { JWTContextType } from "@/types/auth";
import { InitialLoginContextProps, KeyedObject } from "@/types";

// constant
const initialState: InitialLoginContextProps = {
  isLoggedIn: false,
  isInitialized: false,
  user: null,
};

const verifyToken: (st: string) => boolean = (serviceToken) => {
  if (!serviceToken) {
    return false;
  }
  const decoded: KeyedObject = jwtDecode(serviceToken);
  /**
   * Property 'exp' does not exist on type '<T = unknown>(token: string, options?: JwtDecodeOptions | undefined) => T'.
   */
  return decoded.exp > Date.now() / 1000;
};

const setSession = (serviceToken?: string | null) => {
  if (serviceToken) {
    localStorage.setItem("serviceToken", serviceToken);
    axios.defaults.headers.common.Authorization = `Bearer ${serviceToken}`;
  } else {
    localStorage.removeItem("serviceToken");
    delete axios.defaults.headers.common.Authorization;
  }
};

// ==============================|| JWT CONTEXT & PROVIDER ||============================== //
const JWTContext = createContext<JWTContextType | null>(null);

export const JWTProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(accountReducer, initialState);

  useEffect(() => {
    const init = async () => {
      try {
        const serviceToken = window.localStorage.getItem("serviceToken");
        if (serviceToken) {
          setSession(serviceToken);
          const response = await axios.get("/api/");
          const { user } = response.data;
          dispatch({
            type: LOGIN,
            payload: {
              isLoggedIn: true,
              user,
            },
          });
        } else {
          dispatch({
            type: LOGOUT,
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: LOGOUT,
        });
      }
    };

    init();
  }, []);

  const login = async (username: string, password: string) => {
    const response = await axios.post("http://localhost:8888/api/login", {
      username,
      password,
    });
    console.log(response);
    const { serviceToken, user } = response.data;   
    setSession(serviceToken);
    dispatch({
      type: LOGIN,
      payload: {
        isLoggedIn: true,
        user,
      },
    });
    
  };

  const register = async (
    name: string,
    username: string,
    email: string,
    password: string
  ) => {
    const response = await axios.post("http://localhost:8888/api/signup", {
      name,
      username,
      email,
      password,
    });
    let users = response.data;
    console.log(response)

    if (
      window.localStorage.getItem("users") !== undefined &&
      window.localStorage.getItem("users") !== null
    ) {
      const localUsers = window.localStorage.getItem("users");
      users = [
        ...JSON.parse(localUsers!),
        {
          email,
          password,
          username,
          name,
        },
      ];
    }
    window.localStorage.setItem("users", JSON.stringify(users));
  };

  const logout = () => {
    setSession(null);
    dispatch({ type: LOGOUT });
  };

  return (
    <JWTContext.Provider
      value={{
        ...state,
        login,
        logout,
        register,
      }}
    >
      {children}
    </JWTContext.Provider>
  );
};

export default JWTContext;
