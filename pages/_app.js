import React from "react";
import "react-toastify/dist/ReactToastify.css";
import "pure-react-carousel/dist/react-carousel.es.css";
import Layout from "../components/Layout";
import { useData, useSearch } from "../customHooks";

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
