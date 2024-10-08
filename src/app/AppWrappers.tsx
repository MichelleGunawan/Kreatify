"use client";
import React, { ReactNode } from "react";
import "../styles/globals.css";
import { GlobalContextProvider } from "@/context/globalContext";
import { SidebarContextProvider } from "@/context/sidebarContext";

export default function AppWrappers({ children }: { children: ReactNode }) {
  return (
    <GlobalContextProvider>
      <SidebarContextProvider>{children}</SidebarContextProvider>
    </GlobalContextProvider>
  );
}
