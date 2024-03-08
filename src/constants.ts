import { ReactElement } from "react";

export const LAYOUT: any = {
  main: "main",
  noauth: "noauth",
};
export interface Props {
  children: ReactElement;
  variant?: "main" | "noauth";
}
export default LAYOUT;
