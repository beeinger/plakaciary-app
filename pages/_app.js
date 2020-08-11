import "react-toastify/dist/ReactToastify.css";
import "pure-react-carousel/dist/react-carousel.es.css";
import Layout from "../components/Layout";
import { DataContainer } from "../containers";

function MyApp({ Component, pageProps }) {
  return (
    <DataContainer.Provider>
      <Layout Component={Component} pageProps={pageProps} />
    </DataContainer.Provider>
  );
}

export default MyApp;
