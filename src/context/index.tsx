import { useContext } from "react";

import { GlobalContext } from "./globalContext";
import { ThemeContext } from "./themeContext";
import { SidebarContext } from "./sidebarContext";

export const useGlobalContext = () => useContext(GlobalContext);
export const useSidebarContext = () => useContext(SidebarContext);
export const useTheme = () => useContext(ThemeContext);
