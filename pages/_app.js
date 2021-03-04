import "react-toastify/dist/ReactToastify.css";
import "pure-react-carousel/dist/react-carousel.es.css";
import "./index.css";

import GlobalContext, { useData, useSearch, useSort } from "context";
import React, { useEffect } from "react";

import ReactGA from "react-ga";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const data = useData(),
    search = useSearch(),
    router = useRouter(),
    sort = useSort();

  useEffect(() => {
    ReactGA.initialize("UA-183254663-2");
  }, []);

  useEffect(() => {
    ReactGA.set({ page: router.pathname });
    ReactGA.pageview(router.pathname);
  }, [router.pathname]);

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
