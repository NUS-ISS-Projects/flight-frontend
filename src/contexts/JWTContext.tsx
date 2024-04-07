"use client";

import React, {
  createContext,
  useReducer,
  ReactNode,
  useState,
  useEffect,
} from "react";

// reducer - state management
import { LOGIN, LOGOUT } from "@/store/actions";
import accountReducer from "@/store/accountReducer";

// project imports
import axios from "@/utils/axios";

import { useRouter } from "next/navigation";

// types
import { JWTContextType } from "@/types/auth";
import { InitialLoginContextProps } from "@/types";

import ErrorPopup from "@/components/authentication/AuthErrorPopUp";
const API_URL = process.env.NEXT_PUBLIC_WEB_API_URL;

// constant
const initialState: InitialLoginContextProps = {
  isLoggedIn: false,
  isInitialized: false,
  user: null,
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
  const router = useRouter();
  const [state, dispatch] = useReducer(accountReducer, initialState);
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  const handleCloseErrorPopup = () => {
    setShowErrorPopup(false);
  };

  useEffect(() => {
    const init = async () => {
      try {
        const serviceToken = window.localStorage.getItem("serviceToken");
        if (serviceToken) {
          dispatch({
            type: LOGIN,
            payload: {
              isLoggedIn: true,
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
    try {
      const response = await axios.post(`${API_URL}/user/login`, {
        username,
        password,
      });
      const serviceToken = response.data;
      console.log(response.data);
      setSession(serviceToken);
      localStorage.setItem("sessionUsername", username);
      if (response.status === 200) {
        router.push("/");
      } else {
        throw new Error("Login failed");
      }
    } catch (err: unknown) {
      console.error(err);
      setShowErrorPopup(true);
    }
  };

  const register = async (
    name: string,
    username: string,
    email: string,
    password: string
  ) => {
    try {
      const response = await axios.post(`${API_URL}/user/signup`, {
        name,
        username,
        email,
        password,
      });
      if (response.status === 200) {
        let users: any[] = [];
        if (response.data) {
          users = response.data;
          console.log(users);
        }
        router.push("/login");
      } else {
        throw new Error("Login failed");
      }
    } catch (err: unknown) {
      console.error(err);
      setShowErrorPopup(true);
    }
  };

  const logout = () => {
    localStorage.removeItem("sessionUsername");
    localStorage.removeItem("serviceToken");
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
      {showErrorPopup && (
        <ErrorPopup
          message="An error occurred."
          onClose={handleCloseErrorPopup}
        />
      )}
    </JWTContext.Provider>
  );
};

export default JWTContext;
