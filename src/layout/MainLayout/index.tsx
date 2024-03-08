import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

// ==============================|| MINIMAL LAYOUT ||============================== //

const MainLayout: FC<Props> = ({ children }) => <>{children}</>;

export default MainLayout;
