"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
function ComponentProvider({ children }: any) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}

export default ComponentProvider;
