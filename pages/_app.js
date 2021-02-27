import "react-toastify/dist/ReactToastify.css";
import "pure-react-carousel/dist/react-carousel.es.css";
import "./index.css";

import GlobalContext, { useData, useSearch, useSort } from "context";

import React from "react";
import { ToastContainer } from "react-toastify";

function MyApp({ Component, pageProps }) {
  const data = useData(),
    search = useSearch(),
    sort = useSort();

  return (
    <GlobalContext.Provider
      value={{
        ...data,
        ...search,
        ...sort,
      }}
    >
      <ToastContainer />
      <Component {...pageProps} />
    </GlobalContext.Provider>
  );
}

export default MyApp;
