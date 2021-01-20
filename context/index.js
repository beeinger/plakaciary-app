import { createContext } from "react";
import useData from "./Data";
import useSearch from "./Search";
import useSort from "./Sort";

const GlobalContext = createContext();

export default GlobalContext;
export { useData, useSearch, useSort };
