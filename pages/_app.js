import React, { useEffect } from "react";
import GlobalContext, { useData, useSearch, useSort } from "context";
import { ToastContainer } from "react-toastify";
import ReactGA from "react-ga";
import { useRouter } from "next/router";

import "react-toastify/dist/ReactToastify.css";
import "pure-react-carousel/dist/react-carousel.es.css";
import "./index.css";

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
