import React from "react";
import Layout from "../components/Layout";
import { useData, useSearch } from "../customHooks";

import "react-toastify/dist/ReactToastify.css";
import "pure-react-carousel/dist/react-carousel.es.css";
import "./index.css";

const Context = React.createContext();

function MyApp({ Component, pageProps }) {
  const data = useData();
  const search = useSearch();
  return (
    <Context.Provider value={{ data, search }}>
      <Layout Component={Component} pageProps={pageProps} Context={Context} />
    </Context.Provider>
  );
}

export default MyApp;
