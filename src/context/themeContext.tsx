"use client";
import React, { createContext, useState, ReactNode, useContext } from "react";

interface ThemeContextProps {
  theme: string;
  setTheme: (theme: string) => void;
}

// Create the context with a default value
export const ThemeContext = createContext<ThemeContextProps>({
  theme: "light",
  setTheme: () => {},
});

// ThemeProvider component to provide the context to its children
export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
