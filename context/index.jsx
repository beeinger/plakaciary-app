import { createContext } from "react";

const GlobalContext = createContext();

export default GlobalContext;
export { default as useData } from "./Data";
export { default as useSearch } from "./Search";
export { default as useSort } from "./Sort";
export { default as useTheme } from "./Theme";
