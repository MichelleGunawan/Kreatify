"use client";
import React, { createContext, useState, ReactNode, useContext } from "react";

// Create the context with a default value
export const SidebarContext = createContext<SidebarContextProps>({
  isOpen: false,
  setIsOpen: () => {},
});

// ThemeProvider component to provide the context to its children
export const SidebarContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </SidebarContext.Provider>
  );
};

interface SidebarContextProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
