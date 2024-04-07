import { ReactElement } from "react";

// types
import { UserProfile } from "@/types/user-profile";

export interface InitialLoginContextProps {
  isLoggedIn: boolean;
  isInitialized?: boolean;
  user?: UserProfile | null | undefined;
}
export type KeyedObject = {
  [key: string]: string | number | KeyedObject | any;
};
export type GuardProps = {
  children: ReactElement | null;
};
export type AuthSliderProps = {
  title: string;
  description: string;
};
export interface TabsProps {
  children?: React.ReactElement | React.ReactNode | string;
  value: string | number;
  index: number;
}
