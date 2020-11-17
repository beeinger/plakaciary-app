import React from "react";
import Layout from "components/Layout";
import GlobalContext, { useData, useSearch } from "context";
import { ToastContainer } from "react-toastify";
import ReactGA from "react-ga";
import { useRouter } from "next/router";

import "react-toastify/dist/ReactToastify.css";
import "pure-react-carousel/dist/react-carousel.es.css";
import "./index.css";

function MyApp({ Component, pageProps }) {
  const data = useData(),
    search = useSearch(),
    router = useRouter();

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
      }}
    >
      <ToastContainer />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </GlobalContext.Provider>
  );
}

export default MyApp;
