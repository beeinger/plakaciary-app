import { createContext } from "react";
import useData from "./Data";
import useSearch from "./Search";

const GlobalContext = createContext();

export default GlobalContext;
export { useData, useSearch };
