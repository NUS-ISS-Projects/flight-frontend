"use client";

import React, {
  createContext,
  useEffect,
  useReducer,
  ReactNode,
  useState,
} from "react";

// third-party
import { jwtDecode } from "jwt-decode";

// reducer - state management
import { LOGIN, LOGOUT } from "@/store/actions";
import accountReducer from "@/store/accountReducer";

// project imports
import axios from "@/utils/axios";

import { useRouter } from "next/navigation";

// types
import { JWTContextType } from "@/types/auth";
import { InitialLoginContextProps, KeyedObject } from "@/types";

import ErrorPopup from "@/components/authentication/AuthErrorPopUp";
const API_URL = process.env.NEXT_PUBLIC_WEB_API_URL;

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
  const router = useRouter();
  const [state, dispatch] = useReducer(accountReducer, initialState);
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  // Function to handle closing the error popup
  const handleCloseErrorPopup = () => {
    setShowErrorPopup(false);
  };

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
    try {
      const response = await axios.post(`${API_URL}/user/login`, {
        username,
        password,
      });
      const { serviceToken, user } = response.data;
      setSession(serviceToken);
      localStorage.setItem("sessionUsername", username);
      dispatch({
        type: LOGIN,
        payload: {
          isLoggedIn: true,
          user,
        },
      });
      if (response.status === 200) {
        router.push("/profile");
      } else {
        // Throw an error if status is not 200
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
    const response = await axios.post(`${API_URL}/user/signup`, {
      name,
      username,
      email,
      password,
    });
    console.log(response);
    let users: any[] = [];
    if (response.data) {
      users = response.data;
      console.log(users);
    }
  };

  const logout = () => {
    localStorage.setItem("sessionUsername", "");
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
