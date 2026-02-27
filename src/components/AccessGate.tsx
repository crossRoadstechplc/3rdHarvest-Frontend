import { ReactNode } from "react";

type AccessGateProps = {
  children: ReactNode;
};

export const AccessGate = ({ children }: AccessGateProps) => {
  return <>{children}</>;
};
