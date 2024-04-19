"use client";

import { SessionProvider } from "next-auth/react";
import { PrimeReactProvider } from "primereact/api";

type Props = {
  children?: React.ReactNode;
};

export const NextAuthProvider = ({ children }: Props) => {
  return (
    <PrimeReactProvider>
      <SessionProvider>{children}</SessionProvider>
    </PrimeReactProvider>
  );
};
