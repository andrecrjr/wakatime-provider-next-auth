'use client'
import { SessionContext, SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";

type Props = {
    children: ReactNode
};

const Template = ({children}:Props) => {
  return{ children};
};
